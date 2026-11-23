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
        <label className="search-field">
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <input
            type="search"
            aria-label="Search events and activities"
            placeholder="Search events, activities, cities..."
            value={search}
            onChange={event => onSearchChange(event.target.value)}
          />
        </label>
      </div>

      <div className="filters">
        {categories.map(item => (
          <button
            key={item}
            type="button"
            className={category === item ? 'filter active' : 'filter'}
            aria-pressed={category === item}
            onClick={() => onCategoryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="demo-note">
        Demo data only. These sample activities are not real or confirmed
        upcoming events.
      </p>

      {events.length > 0 ? (
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
      ) : (
        <div className="empty">
          <div className="empty-icon" aria-hidden="true">
            ⌕
          </div>
          <h3>No matching activities</h3>
          <p>Try another search or clear your filters to see all activities.</p>
          <button
            className="btn secondary"
            type="button"
            onClick={() => {
              onSearchChange('')
              onCategoryChange('All')
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  )
}

export default Explore
