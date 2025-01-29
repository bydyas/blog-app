import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: () => redirect({ to: '/posts' }),
})

function RouteComponent() {
  return <div>TODO: Home Page</div>
}
