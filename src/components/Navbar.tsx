import type { Page } from '../types'

type NavbarProps = {
  loggedIn: boolean
  onNavigate: (page: Page) => void
}

function Navbar({ loggedIn, onNavigate }: NavbarProps) {
  return (
    <header className="navbar">
      <button className="logo" onClick={() => onNavigate('home')}>
        globmate<span>.</span>
      </button>

      <nav>
        <button onClick={() => onNavigate('home')}>Home</button>
        <button onClick={() => onNavigate('explore')}>Explore</button>
        <button onClick={() => onNavigate('community')}>Community</button>
        <button onClick={() => onNavigate('saved')}>Saved</button>
      </nav>

      <button
        className="btn dark"
        onClick={() => onNavigate(loggedIn ? 'profile' : 'auth')}
      >
        {loggedIn ? 'My Profile' : 'Join now ↗'}
      </button>
    </header>
  )
}

export default Navbar
