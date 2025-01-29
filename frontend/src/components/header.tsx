import { Link } from "@tanstack/react-router"
import { useAuthStore } from "../stores/useAuthStore"

export const Header = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  return (
    <header>
      <div className='mt-[30px] flex items-center h-10'>
        {isAuth ? (
          <Link to='/profile' className='font-semibold text-[20px] text-primary'>My Profile</Link>
        ) : (
          <Link className="capitalize bg-accent text-white px-3 py-2 rounded" to="/auth" search={{ type: 'login' }}>log in</Link>
        )}
        <nav className='flex-grow flex justify-end gap-[20px]'>
          <Link className='text-[20px] text-primary' to="/posts">Community Posts</Link>
          <Link className='text-[20px] text-primary' to="/posts">Write Your Post</Link>
        </nav>
      </div>
      <div className='mt-[50px] mb-[30px] text-center border-t border-b border-secondary'>
        <h1 className="font-bold  text-[152px] lg:text-[200px]  xl:text-[248px] uppercase text-primary">the blog</h1>
      </div>
    </header>
  )
}