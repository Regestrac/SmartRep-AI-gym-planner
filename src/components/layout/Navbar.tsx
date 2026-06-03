import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import { UserButton } from '@neondatabase/neon-js/auth/react';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className='fixed top-0 left-0 right-0 border-b border-border bg-background/80 backdrop-blur-md'>
      <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
        <Link to="/" className='flex items-center gap-2 text-foreground'>
          <img className='w-6 h-6' src="https://img.icons8.com/ios-filled/100/a3e635/dumbbell.png" alt="dumbbell" />
          <span>SmartRep</span>
        </Link>
        <nav>
          {user ? (
            <>
            <Link to="/profile">
                <Button size='sm' variant='ghost'>My Plan</Button>
              </Link>
              <UserButton className='bg-accent' />
            </>
          ) : (
            <>
              <Link to="/auth/sign-in">
                <Button size='sm' variant='ghost'>Sign In</Button>
              </Link>
              <Link to="/auth/sign-up">
                <Button size='sm'>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar