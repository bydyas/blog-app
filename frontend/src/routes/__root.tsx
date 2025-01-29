import * as React from 'react'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient,
}>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <header>
        <div className='mt-[30px] flex items-center h-10'>
          <span className='font-semibold text-[20px] text-primary'>Your Name</span>
          <nav className='flex-grow flex justify-end gap-[20px]'>
            <Link className='text-[20px] text-primary' to="/posts">Community Posts</Link>
            <Link className='text-[20px] text-primary' to="/posts">Write Your Post</Link>
          </nav>
        </div>
        <div className='mt-[50px] mb-[30px] text-center border-t border-b border-secondary'>
          <h1 className="font-bold text-[248px] uppercase text-primary">the blog</h1>
        </div>
      </header>

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
