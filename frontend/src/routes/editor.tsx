import { useState } from 'react';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useAuthStore } from '../stores/useAuthStore';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Preloader } from '../components/preloader';
import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { postsService } from '../services/posts.service';

type Input = {
  title: string;
  previewSrc: string;
}

const profileQueryOptions = queryOptions({
  queryKey: ['profile'],
  queryFn: () => authService.getProfile(),
})

export const Route = createFileRoute('/editor')({
  component: RouteComponent,
  loader: ({ context }) =>
        context.queryClient.ensureQueryData(profileQueryOptions),
  beforeLoad: () => {
    const isAuth = useAuthStore.getState().isAuth;
    if (!isAuth) {
      throw redirect({
        to: "/auth",
        search: { type: 'login' }
      });
    }
  },
  pendingComponent: () => <Preloader />,
})

function RouteComponent() {
  const { data } = useSuspenseQuery(profileQueryOptions)
  const navigate = useNavigate()
  const [body, setBody] = useState('');
  const [isEditorError, setIsEditorError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>()

  const mutation = useMutation({
    mutationFn: (data: any) => postsService.createOne(data),
    onSuccess: ({ id }) => navigate({ to: '/$postId', params: { postId: id } }),
  })

  const profileId = data.profile.id

  const onSubmit: SubmitHandler<Input> = (inputData) =>  {
    if (!body) {
      setIsEditorError(true)
      return
    }
    mutation.mutate({ ...inputData, body, profileId })
  }

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.title && <span className='text-red-500 mb-1'>*This field is required</span>}
        <input
          placeholder='Title'
          className='block mb-4 h-10 w-full rounded border border-primary px-3' 
          {...register("title", { required: true })}
        />
        {errors.previewSrc && <span className='text-red-500 mb-1'>*This field is required</span>}
        <input
          placeholder='Preview Image Link'
          className='block mb-4 h-10 w-full rounded border border-primary px-3' 
          {...register("previewSrc", { required: true })}
        />
        {isEditorError && <span className='text-red-500 mb-1'>*This field is required</span>}
        <ReactQuill theme="snow" value={body} onChange={(v) => {
          setBody(v);
          if (isEditorError) {
            setIsEditorError(false);
          }
        }} />
        <input
          className='mt-4 w-full cursor-pointer bg-accent text-white px-3 py-2 rounded hover:opacity-[75%]' 
          type="submit"
          value={"Publish"}
        />
      </form>
    </main>
  )
}
