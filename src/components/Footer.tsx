import type { Page } from '../types'

type FooterProps = {
  onNavigate: (page: Page) => void
}

function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="footer">
      <div>
        <button className="logo" onClick={() => onNavigate('home')}>
          globmate<span>.</span>
        </button>

        <p>Connecting students beyond borders.</p>
      </div>

      <div className="footer-right">
        <p>Made with ♥ for global students</p>
        <p>© {new Date().getFullYear()} globmate.</p>
      </div>
    </footer>
  )
}

export default Footer
