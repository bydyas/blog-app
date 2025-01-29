import { createFileRoute, useNavigate, redirect} from '@tanstack/react-router'
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuthStore } from '../stores/useAuthStore'
import { SignIn, SignUp } from '../libs/definitions';
import { authService } from '../services/auth.service';
import { useMutation } from '@tanstack/react-query';

type AuthSearch = {
  type: 'login' | 'reg';
};

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): AuthSearch => {
    return {
      type: (search?.type || 'login') as AuthSearch['type'],
    }
  },
  beforeLoad: () => {
    const isAuth = useAuthStore.getState().isAuth;
    if (isAuth) throw redirect({ to: "/" });
  }
})

function RouteComponent() {
  const { type } = Route.useSearch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp | SignIn>()
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  
  const mutation = useMutation({
    mutationFn: (data: { type: 'login' | 'reg', creds: SignUp | SignIn }) => {
      return authService.auth(data.type, data.creds)
    },
    onSuccess: ({ access_token }) => {
      setAccessToken(access_token)
      navigate({ to: '/' })
    },
  })

  const onSubmit: SubmitHandler<SignUp | SignIn> = (creds) =>  mutation.mutate({ type, creds })

  return (
    <form className='w-100 flex-grow mx-auto' onSubmit={handleSubmit(onSubmit)}>
      {type === 'reg' && (
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <input 
              placeholder='Firt Name'
              className='block mb-1 h-10 w-full rounded border border-primary px-3' 
              {...register("firstName", { required: true })}
            />
            {errors.firstName && <span className='text-red-500 mb-1'>This field is required</span>}
          </div>
          <div>
            <input 
              placeholder='Last Name'
              className='block mb-1 h-10 w-full rounded border border-primary px-3' 
              {...register("lastName", { required: true })}
            />
            {errors.lastName && <span className='text-red-500 mb-1'>This field is required</span>}
          </div>
        </div>
      )}
      <input 
        placeholder='Username'
        className='block mb-1 h-10 w-full rounded border border-primary px-3' 
        {...register("username", { required: true })}
      />
      {errors.username && <span className='text-red-500 mb-1'>This field is required</span>}
      <input
        placeholder='Password'
        className='block mb-1 h-10 w-full rounded border border-primary px-3' 
        {...register("password", { required: true, minLength: 6 })}
      />
      {errors.password && <span className='text-red-500 mb-1'>This field is required (min length = 6)</span>}
      <input
        disabled={mutation.isPending}
        className='mt-4 w-full cursor-pointer bg-accent text-white px-3 py-2 rounded hover:opacity-[75%]' 
        type="submit"
        value={type === 'login' ? "Log In" : "Register"}
      />
      {mutation.error && <span className='mt-1 text-red-500 mb-1'>{mutation.error.message}</span>}
    </form>
  )
}
