import EventCard from '../components/EventCard'
import type { EventItem } from '../data/events'

const categories = ['All', 'Social', 'Tech', 'Creative', 'Language']

type ExploreProps = {
  events: EventItem[]
  search: string
  category: string
  saved: number[]
  onSearchChange: (value: string) => void
  onCategoryChange: (category: string) => void
  onToggleSaved: (id: number) => void
}

function Explore({
  events,
  search,
  category,
  saved,
  onSearchChange,
  onCategoryChange,
  onToggleSaved,
}: ExploreProps) {
  return (
    <section className="section page-section">
      <span className="eyebrow">DISCOVER YOUR WORLD</span>

      <h1 className="page-title">Explore what&apos;s around you.</h1>

      <p className="page-subtitle">
        Discover people, activities, and new experiences.
      </p>

      <div className="search-area">
        <input
          type="search"
          placeholder="Search events, activities, cities..."
          value={search}
          onChange={event => onSearchChange(event.target.value)}
        />
      </div>

      <div className="filters">
        {categories.map(item => (
          <button
            key={item}
            className={category === item ? 'filter active' : 'filter'}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="demo-note">
        Sample activities for design demonstration. These are not confirmed
        upcoming events.
      </p>

      <div className="event-grid">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            saved={saved.includes(event.id)}
            onToggleSaved={onToggleSaved}
          />
        ))}
      </div>

      {events.length === 0 && (
        <div className="empty">No matching activities found.</div>
      )}
    </section>
  )
}

export default Explore
