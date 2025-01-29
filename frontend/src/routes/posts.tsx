import * as React from 'react'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { postsService } from '../services/posts.service'
import { PreviewPost } from '../components/preview-post'
import { IPost } from '../libs/definitions'
import { Preloader } from '../components/preloader'

const postsQueryOptions = queryOptions({
  queryKey: ['posts'],
  queryFn: () => postsService.findAll(),
})

export const Route = createFileRoute('/posts')({
  component: RouteComponent,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(postsQueryOptions),
  pendingComponent: () => <Preloader />,
})

function RouteComponent() {
  const { data } = useSuspenseQuery(postsQueryOptions)

  if (!data.length) {
    return (
      <main className="flex-grow flex items-center justify-center">
        <Link className="text-2xl" to="/">
          No published posts yet...
          <span className="text-accent">Be first!</span>
        </Link>
      </main>
    )
  }

  return (
    <main>
      <ul className="grid grid-cols-3 gap-[32px]">
        {data.map((v: IPost) => (
          <li key={v.id}>
            <PreviewPost {...v} />
          </li>
        ))}
      </ul>
    </main>
  )
}
