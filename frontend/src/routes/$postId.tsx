import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { postsService } from '../services/posts.service'
import { IPost } from '../libs/definitions'
import { Preloader } from '../components/preloader'
import { Comments } from '../components/Comments'

const postQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: [`post-${postId}`],
    queryFn: () => postsService.findOne(postId),
  })

export const Route = createFileRoute('/$postId')({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(postQueryOptions(params.postId)),
  component: RouteComponent,
  pendingComponent: () => <Preloader />,
})

function RouteComponent() {
  const { postId } = Route.useParams()
  const { data } = useSuspenseQuery(postQueryOptions(postId))
  const { profile, ...post } = data as IPost;

  const publishedAt = new Date(post.createdAt).toLocaleDateString('en-UK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const author = `${profile.firstName} ${profile.lastName}`;

  return (
    <main>
      <section>
        <div className='mb-3 flex justify-between items-center gap-3'>
          <Link className="bg-accent text-white px-3 py-2 rounded" to='/posts'>Go Back</Link>
          <p className='text-sm text-accent font-semibold'>{author} &#x2022; {publishedAt}</p>
        </div>
        <figure className='relative'>
          <img className='w-full h-100 object-cover' src={post.previewSrc} alt="" />
          <figcaption className='absolute top-[50%] left-20 -translate-y-[50%]'>
            <h2 className='text-7xl text-white font-extrabold uppercase drop-shadow-md text-primary'>{post.title}</h2>
          </figcaption>
        </figure>
      </section>
      <section className='my-5 text-2xl text-secondary' dangerouslySetInnerHTML={{ __html: post.body }}/>
      <Comments data={post.comments} postId={postId} />
    </main>
  )
}
