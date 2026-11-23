import EventCard from '../components/EventCard'
import type { EventItem } from '../data/events'
import type { Page } from '../types'

type SavedProps = {
  events: EventItem[]
  saved: number[]
  onToggleSaved: (id: number) => void
  onNavigate: (page: Page) => void
}

function Saved({ events, saved, onToggleSaved, onNavigate }: SavedProps) {
  const savedEvents = events.filter(event => saved.includes(event.id))

  return (
    <section className="section page-section">
      <span className="eyebrow">YOUR COLLECTION</span>

      <h1 className="page-title">Saved experiences.</h1>

      <p className="page-subtitle">
        Keep your favorite activities in one place.
      </p>

      {savedEvents.length === 0 ? (
        <div className="empty">
          <h3>Nothing saved yet.</h3>

          <p>Start exploring and save something you love.</p>

          <button
            className="btn primary"
            onClick={() => onNavigate('explore')}
          >
            Explore events →
          </button>
        </div>
      ) : (
        <div className="event-grid">
          {savedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              saved={saved.includes(event.id)}
              onToggleSaved={onToggleSaved}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Saved
