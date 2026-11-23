export type EventItem = {
  id: number
  title: string
  category: string
  location: string
  description: string
  image: string
}

export const events: EventItem[] = [
  {
    id: 1,
    title: 'International Student Meetup',
    category: 'Social',
    location: 'Kuala Lumpur',
    description: 'Meet new friends from around the world.',
    image: '/images/student-meetup.jpg',
  },
  {
    id: 2,
    title: 'AI & Developer Meetup',
    category: 'Tech',
    location: 'Kuala Lumpur',
    description: 'Connect with students interested in AI and coding.',
    image: '/images/tech-conference.jpg',
  },
  {
    id: 3,
    title: 'Cultural Photography Walk',
    category: 'Creative',
    location: 'Kuala Lumpur',
    description: 'Capture colorful performances and traditions around the city.',
    image: '/images/cultural-event.jpg',
  },
  {
    id: 4,
    title: 'Language Exchange',
    category: 'Language',
    location: 'Kuala Lumpur',
    description: 'Practice languages and share cultures.',
    image: '/images/language-exchange.jpg',
  },
  {
    id: 5,
    title: 'Creative Campus Workshop',
    category: 'Creative',
    location: 'Kuala Lumpur',
    description: 'Collaborate on a hands-on creative project with other students.',
    image: '/images/workshop.jpg',
  },
  {
    id: 6,
    title: 'Campus Music Festival',
    category: 'Social',
    location: 'Kuala Lumpur',
    description: 'Enjoy live music and an energetic night with fellow students.',
    image: '/images/music-festival.jpg',
  },
]
