import { useState, useEffect } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const emptyPost = { title: '', slug: '', category: 'General', excerpt: '', content: '', author: 'Outpro Team', tags: '', status: 'draft' }

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)   // null = new post
  const [form, setForm] = useState(emptyPost)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const res = await axios.get(`${API}/api/posts?admin=true`)
      setPosts(res.data)
    } catch { } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const openNew = () => { setForm(emptyPost); setEditing(null); setError(''); setShowModal(true) }
  const openEdit = (post) => {
    setForm({ ...post, tags: (post.tags || []).join(', ') })
    setEditing(post._id)
    setError('')
    setShowModal(true)
  }
  const closeModal = () => { setShowModal(false); setEditing(null) }

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const handleSave = async () => {
    if (!form.title || !form.content) { setError('Title and content are required.'); return }
    setSaving(true); setError('')
    try {
      const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) }
      if (editing) {
        await axios.put(`${API}/api/posts/${editing}`, payload)
      } else {
        await axios.post(`${API}/api/posts`, payload)
      }
      await load()
      closeModal()
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return
    try { await axios.delete(`${API}/api/posts/${id}`); await load() } catch { alert('Error deleting post.') }
  }

  const toggleStatus = async (post) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    try { await axios.put(`${API}/api/posts/${post._id}`, { status: newStatus }); await load() } catch { }
  }

  if (loading) return <div className="loading">Loading posts...</div>

  return (
    <div>
      <div className="admin-page-header">
        <h1>Posts</h1>
        <button className="btn btn-primary" onClick={openNew}>+ New Post</button>
      </div>

      <div className="admin-card">
        {posts.length === 0 ? (
          <div className="empty-state"><p>No posts yet. Create your first one!</p></div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr><th>Title</th><th>Category</th><th>Author</th><th>Status</th><th>Date</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id}>
                  <td><strong>{post.title}</strong><br /><span style={{ fontSize: 12, color: 'var(--gray-500)' }}>/posts/{post.slug}</span></td>
                  <td>{post.category}</td>
                  <td>{post.author}</td>
                  <td>
                    <span
                      className={`status-badge status-${post.status}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleStatus(post)}
                      title="Click to toggle"
                    >{post.status}</span>
                  </td>
                  <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="action-btn" onClick={() => openEdit(post)}>Edit</button>
                    <button className="action-btn danger" onClick={() => handleDelete(post._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal">
            <div className="modal-header">
              <h2>{editing ? 'Edit Post' : 'New Post'}</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            {error && <div className="error-msg" style={{ marginBottom: 16, padding: '10px 14px', background: '#FEF2F2', borderRadius: 8, border: '1px solid #FECACA' }}>{error}</div>}
            <div className="form-group"><label>Title *</label><input name="title" value={form.title} onChange={handleChange} placeholder="Post title" /></div>
            <div className="grid-2" style={{ gap: 14 }}>
              <div className="form-group"><label>Slug (auto-generated if blank)</label><input name="slug" value={form.slug} onChange={handleChange} placeholder="my-post-title" /></div>
              <div className="form-group"><label>Category</label><input name="category" value={form.category} onChange={handleChange} placeholder="General" /></div>
            </div>
            <div className="grid-2" style={{ gap: 14 }}>
              <div className="form-group"><label>Author</label><input name="author" value={form.author} onChange={handleChange} /></div>
              <div className="form-group"><label>Status</label>
                <select name="status" value={form.status} onChange={handleChange}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="form-group"><label>Excerpt</label><input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Short summary..." /></div>
            <div className="form-group"><label>Tags (comma-separated)</label><input name="tags" value={form.tags} onChange={handleChange} placeholder="SEO, performance, React" /></div>
            <div className="form-group"><label>Content *</label><textarea name="content" value={form.content} onChange={handleChange} style={{ minHeight: 200 }} placeholder="Write your post content here..." /></div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 8 }}>
              <button className="action-btn" onClick={closeModal}>Cancel</button>
              <button className="action-btn primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save Post'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
