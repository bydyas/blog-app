import { createFileRoute, redirect, useRouteContext, Link } from '@tanstack/react-router'
import { useAuthStore } from '../stores/useAuthStore';
import { Trash2 } from 'lucide-react';
import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { Preloader } from '../components/preloader';
import { PreviewPost } from '../components/preview-post';
import { IPost } from '../libs/definitions';
import { postsService } from '../services/posts.service';

const profileQueryOptions = queryOptions({
  queryKey: ['profile'],
  queryFn: () => authService.getProfile(),
})

export const Route = createFileRoute('/profile')({
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
  const context = useRouteContext({ from: '/profile' })
  
  const fullName = `${data.profile.firstName} ${data.profile.lastName}`

  const mutation = useMutation({
    mutationFn: (id: any) => postsService.removeOne(id),
    onSuccess: () => context.queryClient.invalidateQueries({ queryKey: ['profile'] }),
  })
  
  if (!data.profile.posts.length) {
    return (
      <main className='flex-grow flex justify-center items-center'>
        <Link to="/editor" className='text-2xl text-primary font-semibold'>
          {fullName}, you have no published posts yet...
          <p className='text-accent'>Write your first post!</p>
        </Link>
      </main>
    )
  }

  return (
    <main>
      <h5 className='text-2xl text-primary font-semibold'>
        <span className='text-accent font-extrabold'>{fullName},</span> your posts are below:
      </h5>
      <ul className='my-5 grid grid-cols-4 gap-5'>
        {data.profile.posts.map((v: IPost) => (
          <li key={v.id}>
            <div className='flex justify-between items-center gap-3 bg-red-600 h-10 px-3 rounded-t'>
              <p className='text-sm text-white font-semibold'>[Author Tools]</p>
              <button
                disabled={mutation.isPending}
                onClick={() => mutation.mutate(v.id)} 
                className='bg-transparent border-0 cursor-pointer'
              >
                <Trash2 color='#FFF' size={24} />
              </button>
            </div>
            <PreviewPost {...v} />
          </li>
        ))}
      </ul>
    </main>
  )
}
