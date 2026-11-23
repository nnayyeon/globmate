import type { EventItem } from '../data/events'

type EventCardProps = {
  event: EventItem
  saved: boolean
  onToggleSaved: (id: number) => void
}

function EventCard({ event, saved, onToggleSaved }: EventCardProps) {
  return (
    <article className="event-card">
      <div className="event-art">{event.icon}</div>

      <div className="event-body">
        <span className="tag">{event.category}</span>

        <h3>{event.title}</h3>
        <p>{event.description}</p>

        <div className="card-bottom">
          <span>📍 {event.location}</span>

          <button
            className="small-button"
            onClick={() => onToggleSaved(event.id)}
          >
            {saved ? '♥ Saved' : '♡ Save'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default EventCard
