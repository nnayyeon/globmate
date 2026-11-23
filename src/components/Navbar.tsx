import type { Page } from '../types'

type NavbarProps = {
  loggedIn: boolean
  currentPage: Page
  onNavigate: (page: Page) => void
}

function Navbar({ loggedIn, currentPage, onNavigate }: NavbarProps) {
  return (
    <header className="navbar">
      <button
        className="logo"
        type="button"
        aria-label="Globmate home"
        onClick={() => onNavigate('home')}
      >
        globmate<span>.</span>
      </button>

      <nav>
        <button
          className="nav-link"
          type="button"
          aria-current={currentPage === 'home' ? 'page' : undefined}
          onClick={() => onNavigate('home')}
        >
          Home
        </button>
        <button
          className="nav-link"
          type="button"
          aria-current={currentPage === 'explore' ? 'page' : undefined}
          onClick={() => onNavigate('explore')}
        >
          Explore
        </button>
        <button
          className="nav-link"
          type="button"
          aria-current={currentPage === 'community' ? 'page' : undefined}
          onClick={() => onNavigate('community')}
        >
          Community
        </button>
        <button
          className="nav-link"
          type="button"
          aria-current={currentPage === 'saved' ? 'page' : undefined}
          onClick={() => onNavigate('saved')}
        >
          Saved
        </button>
      </nav>

      <button
        className="btn dark"
        type="button"
        aria-current={currentPage === 'profile' ? 'page' : undefined}
        onClick={() => onNavigate(loggedIn ? 'profile' : 'auth')}
      >
        {loggedIn ? 'My Profile' : 'Join now ↗'}
      </button>
    </header>
  )
}

export default Navbar
