export type Page =
  | 'home'
  | 'explore'
  | 'community'
  | 'saved'
  | 'profile'
  | 'auth'

export type Post = {
  id: number
  author: string
  title: string
  content: string
  likes: number
  comments: string[]
}

export type Profile = {
  name: string
  email: string
  university: string
  country: string
  interests: string
}

export type AuthMode = 'signup' | 'login'
