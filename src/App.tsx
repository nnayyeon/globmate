import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { events } from './data/events'
import Auth from './pages/Auth'
import Community from './pages/Community'
import Explore from './pages/Explore'
import Home from './pages/Home'
import ProfilePage from './pages/Profile'
import Saved from './pages/Saved'
import type { AuthMode, Page, Post, Profile } from './types'

const initialPosts: Post[] = [
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

const emptyProfile: Profile = {
  name: '',
  email: '',
  university: '',
  country: '',
  interests: '',
}

function loadData<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? (JSON.parse(stored) as T) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [page, setPage] = useState<Page>('home')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [saved, setSaved] = useState<number[]>(() =>
    loadData('globmate-saved', [])
  )
  const [posts, setPosts] = useState<Post[]>(() =>
    loadData('globmate-posts', initialPosts)
  )
  const [user, setUser] = useState<Profile>(() =>
    loadData('globmate-user', emptyProfile)
  )
  const [loggedIn, setLoggedIn] = useState<boolean>(() =>
    loadData('globmate-login', false)
  )
  const [authMode, setAuthMode] = useState<AuthMode>('signup')
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')

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

  function createPost() {
    if (!postTitle.trim() || !postContent.trim()) {
      alert('Please complete both fields.')
      return
    }

    const newPost: Post = {
      id: Date.now(),
      author: user.name || 'Guest Student',
      title: postTitle.trim(),
      content: postContent.trim(),
      likes: 0,
      comments: [],
    }

    const updated = [newPost, ...posts]

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

  function saveProfile() {
    localStorage.setItem('globmate-user', JSON.stringify(user))
    alert('Profile saved!')
  }

  function logout() {
    setLoggedIn(false)
    localStorage.setItem('globmate-login', JSON.stringify(false))
    navigate('home')
  }

  function updateUser(field: keyof Profile, value: string) {
    setUser(current => ({ ...current, [field]: value }))
  }

  const query = search.toLowerCase()
  const filteredEvents = events.filter(event => {
    const categoryMatch = category === 'All' || event.category === category
    const searchMatch = [
      event.title,
      event.category,
      event.location,
      event.description,
    ]
      .join(' ')
      .toLowerCase()
      .includes(query)

    return categoryMatch && searchMatch
  })

  return (
    <div className="app">
      <Navbar loggedIn={loggedIn} onNavigate={navigate} />

      <main>
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'explore' && (
          <Explore
            events={filteredEvents}
            search={search}
            category={category}
            saved={saved}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            onToggleSaved={toggleSaved}
          />
        )}
        {page === 'community' && (
          <Community
            posts={posts}
            postTitle={postTitle}
            postContent={postContent}
            onPostTitleChange={setPostTitle}
            onPostContentChange={setPostContent}
            onCreatePost={createPost}
            onLikePost={likePost}
            onAddComment={addComment}
          />
        )}
        {page === 'saved' && (
          <Saved
            events={events}
            saved={saved}
            onToggleSaved={toggleSaved}
            onNavigate={navigate}
          />
        )}
        {page === 'profile' && (
          <ProfilePage
            user={user}
            onUpdateUser={updateUser}
            onSaveProfile={saveProfile}
            onLogout={logout}
          />
        )}
        {page === 'auth' && (
          <Auth
            mode={authMode}
            user={user}
            onUpdateUser={updateUser}
            onSubmit={submitAuth}
            onModeChange={() =>
              setAuthMode(current =>
                current === 'signup' ? 'login' : 'signup'
              )
            }
          />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  )
}

export default App
