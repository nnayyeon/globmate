import type { AuthMode, Profile } from '../types'

type AuthProps = {
  mode: AuthMode
  user: Profile
  onUpdateUser: (field: 'name' | 'email', value: string) => void
  onSubmit: () => void
  onModeChange: () => void
}

function Auth({ mode, user, onUpdateUser, onSubmit, onModeChange }: AuthProps) {
  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="eyebrow">WELCOME TO GLOBMATE</div>

        <h1>{mode === 'signup' ? 'Your journey starts here.' : 'Welcome back.'}</h1>

        <p>Connect with students beyond borders.</p>

        <label>Full name</label>
        <input
          placeholder="Your name"
          value={user.name}
          onChange={event => onUpdateUser('name', event.target.value)}
        />

        <label>Email address</label>
        <input
          type="email"
          placeholder="you@university.edu"
          value={user.email}
          onChange={event => onUpdateUser('email', event.target.value)}
        />

        <button className="btn primary full" onClick={onSubmit}>
          {mode === 'signup' ? 'Create demo profile →' : 'Continue to demo →'}
        </button>

        <p className="auth-switch">
          {mode === 'signup'
            ? 'Already have an account?'
            : 'New to globmate?'}{' '}
          <button onClick={onModeChange}>
            {mode === 'signup' ? 'Log in' : 'Sign up'}
          </button>
        </p>

        <small>Demo only. No real account authentication.</small>
      </div>
    </section>
  )
}

export default Auth
