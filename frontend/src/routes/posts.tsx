import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
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
  pendingComponent: () => <Preloader />
})

function RouteComponent() {
  const { data } = useSuspenseQuery(postsQueryOptions)

  return (
    <main>
      <ul className='grid grid-cols-3 gap-[32px]'>
        {data.map((v: IPost) => (
          <li className='mt-2' key={v.id}>
            <PreviewPost {...v} />
          </li>
        ))}
      </ul>
    </main>
  )
}
