
import { useState } from 'react'
import './App.css'

type Page = 'home' | 'explore' | 'community' | 'saved' | 'profile' | 'auth'

type Event = {
  id: number
  title: string
  category: string
  location: string
  description: string
  icon: string
}

type Post = {
  id: number
  author: string
  title: string
  content: string
  likes: number
  comments: string[]
}

const events: Event[] = [
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

const starterPosts: Post[] = [
  {
    id: 1,
    author: 'Alex',
    title: 'Anyone studying in Kuala Lumpur?',
    content: 'Looking for international student friends!',
    likes: 12,
    comments: [],
  },
  {
    id: 2,
    author: 'Mina',
    title: 'Tips for new exchange students',
    content: 'What should I prepare before arriving?',
    likes: 8,
    comments: [],
  },
]

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [page, setPage] = useState<Page>('home')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const [saved, setSaved] = useState<number[]>(() =>
    readStorage('globmate-saved', [])
  )

  const [posts, setPosts] = useState<Post[]>(() =>
    readStorage('globmate-posts', starterPosts)
  )

  const [user, setUser] = useState(() =>
    readStorage('globmate-user', {
      name: '',
      email: '',
      university: '',
      country: '',
      interests: '',
    })
  )

  const [loggedIn, setLoggedIn] = useState(() =>
    readStorage('globmate-login', false)
  )

  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup')

  function navigate(destination: Page) {
    setPage(destination)
    window.scrollTo(0, 0)
  }

  function toggleSaved(id: number) {
    const updated = saved.includes(id)
      ? saved.filter(item => item !== id)
      : [...saved, id]

    setSaved(updated)
    localStorage.setItem('globmate-saved', JSON.stringify(updated))
  }

  function saveUser() {
    localStorage.setItem('globmate-user', JSON.stringify(user))
    alert('Profile saved!')
  }

  function submitAuth() {
    if (!user.name.trim() || !user.email.trim()) {
      alert('Please enter your name and email.')
      return
    }

    localStorage.setItem('globmate-user', JSON.stringify(user))
    localStorage.setItem('globmate-login', JSON.stringify(true))
    setLoggedIn(true)
    navigate('profile')
  }

  function createPost() {
    if (!postTitle.trim() || !postContent.trim()) return

    const updated: Post[] = [
      {
        id: Date.now(),
        author: user.name || 'Guest Student',
        title: postTitle,
        content: postContent,
        likes: 0,
        comments: [],
      },
      ...posts,
    ]

    setPosts(updated)
    localStorage.setItem('globmate-posts', JSON.stringify(updated))
    setPostTitle('')
    setPostContent('')
  }

  function likePost(id: number) {
    const updated = posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    )
    setPosts(updated)
    localStorage.setItem('globmate-posts', JSON.stringify(updated))
  }

  function addComment(id: number) {
    const comment = window.prompt('Write a comment:')
    if (!comment?.trim()) return

    const updated = posts.map(post =>
      post.id === id
        ? { ...post, comments: [...post.comments, comment.trim()] }
        : post
    )

    setPosts(updated)
    localStorage.setItem('globmate-posts', JSON.stringify(updated))
  }

  const filteredEvents = events.filter(event => {
    const matchesCategory =
      category === 'All' || event.category === category

    const matchesSearch =
      `${event.title} ${event.location} ${event.description}`
        .toLowerCase()
        .includes(search.toLowerCase())

    return matchesCategory && matchesSearch
  })

  function EventCard({ event }: { event: Event }) {
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
              onClick={() => toggleSaved(event.id)}
            >
              {saved.includes(event.id) ? '♥ Saved' : '♡ Save'}
            </button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="app">
      <header className="navbar">
        <button className="logo" onClick={() => navigate('home')}>
          globmate<span>.</span>
        </button>

        <nav>
          <button onClick={() => navigate('home')}>Home</button>
          <button onClick={() => navigate('explore')}>Explore</button>
          <button onClick={() => navigate('community')}>Community</button>
          <button onClick={() => navigate('saved')}>Saved</button>
        </nav>

        <button
          className="btn dark"
          onClick={() => navigate(loggedIn ? 'profile' : 'auth')}
        >
          {loggedIn ? 'My Profile' : 'Join now ↗'}
        </button>
      </header>

      <main>
        {page === 'home' && (
          <>
            <section className="hero">
              <div className="hero-content">
                <div className="eyebrow">● A SPACE FOR GLOBAL STUDENTS</div>
                <h1>
                  New country.<br />
                  New connections.<br />
                  <span>Same world.</span>
                </h1>
                <p>
                  Studying abroad is a big adventure.
                  Finding your people shouldn't be hard.
                  Meet, explore, and belong with globmate.
                </p>
                <div className="actions">
                  <button
                    className="btn primary"
                    onClick={() => navigate('explore')}
                  >
                    Get started ↗
                  </button>
                  <button
                    className="text-button"
                    onClick={() => navigate('community')}
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
                  <strong>👋 Hey, I'm Alex!</strong>
                  <small>New in Kuala Lumpur 🇲🇾</small>
                </div>
                <div className="floating-card bottom-card">
                  <strong>Welcome aboard!</strong>
                  <small>Let's explore together ✨</small>
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
                {[
                  ['🌍', 'Explore', 'Discover activities and events.', 'explore'],
                  ['💬', 'Connect', 'Meet students from around the world.', 'community'],
                  ['✨', 'Belong', 'Build your own global community.', 'auth'],
                ].map(item => (
                  <button
                    className="feature-card"
                    key={item[1]}
                    onClick={() => navigate(item[3] as Page)}
                  >
                    <div className="feature-icon">{item[0]}</div>
                    <h3>{item[1]}</h3>
                    <p>{item[2]}</p>
                    <span>Explore →</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="cta">
              <span>YOUR NEXT CHAPTER STARTS HERE</span>
              <h2>
                The world feels smaller<br />
                when we connect.
              </h2>
              <p>A new community for international students.</p>
              <button
                className="btn outline-light"
                onClick={() => navigate('auth')}
              >
                Join globmate ↗
              </button>
            </section>
          </>
        )}

        {page === 'explore' && (
          <section className="section page-section">
            <span className="eyebrow">DISCOVER YOUR WORLD</span>
            <h1 className="page-title">Explore what's around you.</h1>
            <p className="page-subtitle">
              Discover people, activities, and new experiences.
            </p>

            <div className="search-area">
              <input
                placeholder="Search events, activities, cities..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="filters">
              {['All', 'Social', 'Tech', 'Creative', 'Language'].map(item => (
                <button
                  key={item}
                  className={category === item ? 'filter active' : 'filter'}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <p className="demo-note">
              Sample activities for design demonstration.
              These are not confirmed upcoming events.
            </p>

            <div className="event-grid">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {filteredEvents.length === 0 && (
              <div className="empty">No matching activities found.</div>
            )}
          </section>
        )}

        {page === 'community' && (
          <section className="section page-section">
            <span className="eyebrow">STUDENT COMMUNITY</span>
            <h1 className="page-title">Better together.</h1>
            <p className="page-subtitle">
              Ask questions, share experiences, and find your people.
            </p>

            <div className="community-layout">
              <div className="post-list">
                {posts.map(post => (
                  <article className="post-card" key={post.id}>
                    <div className="post-author">
                      <div className="avatar">
                        {post.author.charAt(0).toUpperCase()}
                      </div>
                      <strong>{post.author}</strong>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>

                    <div className="post-actions">
                      <button onClick={() => likePost(post.id)}>
                        ♡ {post.likes} Likes
                      </button>
                      <button onClick={() => addComment(post.id)}>
                        💬 {post.comments.length} Comments
                      </button>
                    </div>

                    {post.comments.map((comment, index) => (
                      <div className="comment" key={index}>
                        {comment}
                      </div>
                    ))}
                  </article>
                ))}
              </div>

              <div className="compose-card">
                <h3>Start a conversation ✨</h3>
                <p>Have something to share?</p>
                <input
                  placeholder="Post title"
                  value={postTitle}
                  onChange={e => setPostTitle(e.target.value)}
                />
                <textarea
                  placeholder="What's on your mind?"
                  rows={5}
                  value={postContent}
                  onChange={e => setPostContent(e.target.value)}
                />
                <button
                  className="btn primary full"
                  onClick={createPost}
                >
                  Publish post →
                </button>
              </div>
            </div>
          </section>
        )}

        {page === 'saved' && (
          <section className="section page-section">
            <span className="eyebrow">YOUR COLLECTION</span>
            <h1 className="page-title">Saved experiences.</h1>
            <p className="page-subtitle">
              Keep your favorite activities in one place.
            </p>

            {saved.length === 0 ? (
              <div className="empty">
                <h3>Nothing saved yet.</h3>
                <p>Start exploring and save something you love.</p>
                <button
                  className="btn primary"
                  onClick={() => navigate('explore')}
                >
                  Explore events →
                </button>
              </div>
            ) : (
              <div className="event-grid">
                {events.filter(event => saved.includes(event.id))
                  .map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            )}
          </section>
        )}

        {page === 'auth' && (
          <section className="auth-page">
            <div className="auth-card">
              <div className="eyebrow">WELCOME TO GLOBMATE</div>
              <h1>
                {authMode === 'signup'
                  ? 'Your journey starts here.'
                  : 'Welcome back.'}
              </h1>
              <p>Connect with students beyond borders.</p>

              <label>Full name</label>
              <input
                placeholder="Your name"
                value={user.name}
                onChange={e =>
                  setUser({ ...user, name: e.target.value })
                }
              />

              <label>Email address</label>
              <input
                type="email"
                placeholder="you@university.edu"
                value={user.email}
                onChange={e =>
                  setUser({ ...user, email: e.target.value })
                }
              />

              <button
                className="btn primary full"
                onClick={submitAuth}
              >
                {authMode === 'signup'
                  ? 'Create demo profile →'
                  : 'Continue to demo →'}
              </button>

              <p className="auth-switch">
                {authMode === 'signup'
                  ? 'Already have an account?'
                  : 'New to globmate?'}{' '}
                <button onClick={() =>
                  setAuthMode(authMode === 'signup' ? 'login' : 'signup')
                }>
                  {authMode === 'signup' ? 'Log in' : 'Sign up'}
                </button>
              </p>
              <small>
                Demo only. No real account authentication.
              </small>
            </div>
          </section>
        )}

        {page === 'profile' && (
          <section className="section page-section">
            <span className="eyebrow">MY GLOBMATE</span>
            <h1 className="page-title">My profile.</h1>
            <p className="page-subtitle">
              Tell the world a little about yourself.
            </p>

            <div className="profile-card">
              <div className="profile-header">
                <div className="big-avatar">
                  {(user.name || 'G').charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2>{user.name || 'Global Student'}</h2>
                  <p>{user.university || 'Your university'}</p>
                </div>
              </div>

              <div className="profile-form">
                {([
                  ['name', 'Full name'],
                  ['email', 'Email'],
                  ['university', 'University'],
                  ['country', 'Home country'],
                  ['interests', 'Interests'],
                ] as const).map(([key, label]) => (
                  <label key={key}>
                    {label}
                    <input
                      value={user[key]}
                      onChange={e =>
                        setUser({ ...user, [key]: e.target.value })
                      }
                    />
                  </label>
                ))}
              </div>

              <button className="btn primary" onClick={saveUser}>
                Save changes →
              </button>

              <button
                className="logout"
                onClick={() => {
                  setLoggedIn(false)
                  localStorage.setItem(
                    'globmate-login',
                    JSON.stringify(false)
                  )
                  navigate('home')
                }}
              >
                Log out
              </button>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div>
          <button className="logo" onClick={() => navigate('home')}>
            globmate<span>.</span>
          </button>
          <p>Connecting students beyond borders.</p>
        </div>
        <div className="footer-right">
          <p>Made with ♥ for global students</p>
          <p>© 2026 globmate.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
