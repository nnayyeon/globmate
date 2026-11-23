import type { EventItem } from '../data/events'

type EventCardProps = {
  event: EventItem
  saved: boolean
  onToggleSaved: (id: number) => void
}

function EventCard({ event, saved, onToggleSaved }: EventCardProps) {
  return (
    <article className="event-card">
      <div className="event-art">
        <img
          className="event-image"
          src={event.image}
          alt={event.title}
          loading="lazy"
          decoding="async"
        />
        <button
          className="bookmark-button"
          type="button"
          aria-label={
            saved
              ? `Remove ${event.title} from saved events`
              : `Save ${event.title}`
          }
          aria-pressed={saved}
          onClick={() => onToggleSaved(event.id)}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill={saved ? 'currentColor' : 'none'}
          >
            <path
              d="M6.75 3.75h10.5a1 1 0 0 1 1 1v15.5l-6.25-4-6.25 4V4.75a1 1 0 0 1 1-1Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="event-body">
        <span className="tag">{event.category}</span>

        <h3>{event.title}</h3>
        <p>{event.description}</p>

        <div className="card-bottom">
          <span>📍 {event.location}</span>
        </div>
      </div>
    </article>
  )
}

export default EventCard
