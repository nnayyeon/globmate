import type { Profile } from '../types'

const profileFields = [
  ['name', 'Full name'],
  ['email', 'Email'],
  ['university', 'University'],
  ['country', 'Home country'],
  ['interests', 'Interests'],
] as const satisfies readonly (readonly [keyof Profile, string])[]

type ProfileProps = {
  user: Profile
  onUpdateUser: (field: keyof Profile, value: string) => void
  onSaveProfile: () => void
  onLogout: () => void
}

function ProfilePage({
  user,
  onUpdateUser,
  onSaveProfile,
  onLogout,
}: ProfileProps) {
  return (
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
          {profileFields.map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                value={user[key]}
                onChange={event => onUpdateUser(key, event.target.value)}
              />
            </label>
          ))}
        </div>

        <button className="btn primary" onClick={onSaveProfile}>
          Save changes →
        </button>

        <button className="logout" onClick={onLogout}>
          Log out
        </button>
      </div>
    </section>
  )
}

export default ProfilePage
