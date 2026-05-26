// import { Dumbbell } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='fixed top-0 left-0 right-0 border-b border-border bg-background/80 backdrop-blur-md'>
      <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
        <Link to="/" className='flex items-center gap-2 text-foreground'>
          {/* <Dumbbell className='w-6 h-6 text-accent'/> */}
          <img className='w-6 h-6' src="https://img.icons8.com/ios-filled/100/a3e635/dumbbell.png" alt="dumbbell"/>
          <span>SmartRep</span>
        </Link>
      </div>
    </header>
  )
}

export default Navbar