import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthStore } from '../stores/useAuthStore';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { authService } from '../services/auth.service';
import { Preloader } from '../components/preloader';

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
  
  const fullName = `${data.profile.firstName} ${data.profile.lastName}`

  return <div>Hello, {fullName}</div>
}
