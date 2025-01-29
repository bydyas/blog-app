import * as React from 'react'
import { Outlet, createRootRouteWithContext, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Header } from '../components/header'
import globalRouter from '../libs/global-router'
import { useAuthStore } from '../stores/useAuthStore'
import { instance } from '../libs/axios'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient,
}>()({
  component: RootComponent,
})

function RootComponent() {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  globalRouter.navigate = navigate;

  React.useEffect(() => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }, []);

  return (
    <>
      <Header/>
      <Outlet />
      <footer className='flex items-center py-[30px]'>
        <span>&#169; {new Date().getFullYear()}</span>
      </footer>

      {import.meta.env.DEV && (
        <>
          <TanStackRouterDevtools position="bottom-left" />
          <ReactQueryDevtools position="bottom" />
        </>
      )}
    </>
  )
}
