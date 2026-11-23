import type { Post } from '../types'

type CommunityProps = {
  posts: Post[]
  postTitle: string
  postContent: string
  onPostTitleChange: (value: string) => void
  onPostContentChange: (value: string) => void
  onCreatePost: () => void
  onLikePost: (id: number) => void
  onAddComment: (id: number) => void
}

function Community({
  posts,
  postTitle,
  postContent,
  onPostTitleChange,
  onPostContentChange,
  onCreatePost,
  onLikePost,
  onAddComment,
}: CommunityProps) {
  return (
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
                <button onClick={() => onLikePost(post.id)}>
                  ♡ {post.likes} Likes
                </button>

                <button onClick={() => onAddComment(post.id)}>
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
            onChange={event => onPostTitleChange(event.target.value)}
          />

          <textarea
            placeholder="What's on your mind?"
            rows={5}
            value={postContent}
            onChange={event => onPostContentChange(event.target.value)}
          />

          <button className="btn primary full" onClick={onCreatePost}>
            Publish post →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Community
