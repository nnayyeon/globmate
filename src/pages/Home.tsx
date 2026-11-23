import type { Page } from '../types'

type HomeProps = {
  onNavigate: (page: Page) => void
}

function Home({ onNavigate }: HomeProps) {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">A SPACE FOR GLOBAL STUDENTS</div>

          <h1>
            New country.
            <br />
            New connections.
            <br />
            <span>Same world.</span>
          </h1>

          <p>
            Find your people, discover local activities, and make Kuala Lumpur
            feel more like home.
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
          <img
            className="hero-image"
            src="/images/hero-students.jpg"
            alt="International students smiling together on campus"
            fetchPriority="high"
          />
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
            <img
              className="feature-image"
              src="/images/music-festival.jpg"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <div className="feature-content">
              <h3>Explore</h3>
              <p>Discover activities and events.</p>
              <span>Explore →</span>
            </div>
          </button>

          <button
            className="feature-card"
            onClick={() => onNavigate('community')}
          >
            <img
              className="feature-image"
              src="/images/connect-friends.jpg"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <div className="feature-content">
              <h3>Connect</h3>
              <p>Meet students from around the world.</p>
              <span>Explore →</span>
            </div>
          </button>

          <button
            className="feature-card"
            onClick={() => onNavigate('auth')}
          >
            <img
              className="feature-image"
              src="/images/student-meetup.jpg"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />
            <div className="feature-content">
              <h3>Belong</h3>
              <p>Build your own global community.</p>
              <span>Explore →</span>
            </div>
          </button>
        </div>
      </section>

      <section className="cta">
        <img
          className="cta-image"
          src="/images/community-banner.jpg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
        <div className="cta-content">
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
        </div>
      </section>
    </>
  )
}

export default Home
