import * as React from 'react'
import { Outlet, createRootRouteWithContext, useNavigate } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Header } from '../components/header'
import globalRouter from '../libs/global-router'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient,
}>()({
  component: RootComponent,
})

function RootComponent() {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

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
