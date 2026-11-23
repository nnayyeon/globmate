export type EventItem = {
  id: number
  title: string
  category: string
  location: string
  description: string
  icon: string
}

export const events: EventItem[] = [
  {
    id: 1,
    title: 'International Student Meetup',
    category: 'Social',
    location: 'Kuala Lumpur',
    description: 'Meet new friends from around the world.',
    icon: '🌍',
  },
  {
    id: 2,
    title: 'AI & Developer Meetup',
    category: 'Tech',
    location: 'Kuala Lumpur',
    description: 'Connect with students interested in AI and coding.',
    icon: '💻',
  },
  {
    id: 3,
    title: 'Photography Walk',
    category: 'Creative',
    location: 'Kuala Lumpur',
    description: 'Explore the city and take beautiful photos.',
    icon: '📷',
  },
  {
    id: 4,
    title: 'Language Exchange',
    category: 'Language',
    location: 'Kuala Lumpur',
    description: 'Practice languages and share cultures.',
    icon: '💬',
  },
  {
    id: 5,
    title: 'Art & Museum Day',
    category: 'Creative',
    location: 'Kuala Lumpur',
    description: 'Discover local art with international students.',
    icon: '🎨',
  },
  {
    id: 6,
    title: 'Campus Coffee Chat',
    category: 'Social',
    location: 'Kuala Lumpur',
    description: 'Share university life tips over coffee.',
    icon: '☕',
  },
]
