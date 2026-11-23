import type { Page } from '../types'

type HomeProps = {
  onNavigate: (page: Page) => void
}

function Home({ onNavigate }: HomeProps) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">● A SPACE FOR GLOBAL STUDENTS</div>

          <h1>
            New country.
            <br />
            New connections.
            <br />
            <span>Same world.</span>
          </h1>

          <p>
            Studying abroad is a big adventure. Finding your people shouldn&apos;t
            be hard. Meet, explore, and belong with globmate.
          </p>

          <div className="actions">
            <button
              className="btn primary"
              onClick={() => onNavigate('explore')}
            >
              Get started ↗
            </button>

            <button
              className="text-button"
              onClick={() => onNavigate('community')}
            >
              Discover community →
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <div className="globe">◎</div>

          <div className="floating-card top-card">
            <strong>👋 Hey, I&apos;m Alex!</strong>
            <small>New in Kuala Lumpur 🇲🇾</small>
          </div>

          <div className="floating-card bottom-card">
            <strong>Welcome aboard!</strong>
            <small>Let&apos;s explore together ✨</small>
          </div>

          <div className="visual-caption">
            DIFFERENT PLACES. SHARED EXPERIENCES.
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">WHAT WE DO</span>

          <h2>Your world, connected.</h2>

          <p>Everything you need to feel at home abroad.</p>
        </div>

        <div className="feature-grid">
          <button
            className="feature-card"
            onClick={() => onNavigate('explore')}
          >
            <div className="feature-icon">🌍</div>
            <h3>Explore</h3>
            <p>Discover activities and events.</p>
            <span>Explore →</span>
          </button>

          <button
            className="feature-card"
            onClick={() => onNavigate('community')}
          >
            <div className="feature-icon">💬</div>
            <h3>Connect</h3>
            <p>Meet students from around the world.</p>
            <span>Explore →</span>
          </button>

          <button
            className="feature-card"
            onClick={() => onNavigate('auth')}
          >
            <div className="feature-icon">✨</div>
            <h3>Belong</h3>
            <p>Build your own global community.</p>
            <span>Explore →</span>
          </button>
        </div>
      </section>

      <section className="cta">
        <span>YOUR NEXT CHAPTER STARTS HERE</span>

        <h2>
          The world feels smaller
          <br />
          when we connect.
        </h2>

        <p>A new community for international students.</p>

        <button
          className="btn outline-light"
          onClick={() => onNavigate('auth')}
        >
          Join globmate ↗
        </button>
      </section>
    </>
  )
}

export default Home
