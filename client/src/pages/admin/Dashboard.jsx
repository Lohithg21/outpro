import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, forms: 0, submissions: 0, contacts: 0 })
  const [recentSubmissions, setRecentSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [postsRes, formsRes, contactRes] = await Promise.all([
          axios.get(`${API}/api/posts?admin=true`),
          axios.get(`${API}/api/forms`),
          axios.get(`${API}/api/contact`),
        ])

        // Fetch submissions for each form
        let allSubs = []
        for (const form of formsRes.data) {
          try {
            const res = await axios.get(`${API}/api/forms/${form.slug}/submissions`)
            allSubs = allSubs.concat(res.data)
          } catch {}
        }
        allSubs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

        setStats({
          posts: postsRes.data.length,
          forms: formsRes.data.length,
          submissions: allSubs.length,
          contacts: contactRes.data.length,
        })
        setRecentSubmissions(allSubs.slice(0, 5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="loading">Loading dashboard...</div>

  return (
    <div>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <span style={{ fontSize: 14, color: 'var(--gray-500)' }}>{new Date().toDateString()}</span>
      </div>

      <div className="stats-row">
        {[
          { label: 'Total Posts', value: stats.posts, link: '/admin/posts', color: 'var(--blue)' },
          { label: 'Active Forms', value: stats.forms, link: '/admin/forms', color: '#8B5CF6' },
          { label: 'Form Submissions', value: stats.submissions, link: '/admin/submissions', color: '#10B981' },
          { label: 'Contact Leads', value: stats.contacts, link: '/admin/submissions', color: '#F59E0B' },
        ].map((s, i) => (
          <Link to={s.link} key={i} style={{ textDecoration: 'none' }}>
            <div className="stat-card">
              <div className="label">{s.label}</div>
              <div className="value" style={{ color: s.color }}>{s.value}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="admin-card">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between' }}>
          <strong style={{ fontFamily: 'var(--font-heading)' }}>Recent Submissions</strong>
          <Link to="/admin/submissions" style={{ fontSize: 13, color: 'var(--blue)' }}>View all →</Link>
        </div>
        {recentSubmissions.length === 0 ? (
          <div className="empty-state"><p>No submissions yet.</p></div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Form</th>
                <th>Key Info</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentSubmissions.map(sub => {
                const data = Object.fromEntries(sub.data)
                return (
                  <tr key={sub._id}>
                    <td><strong>{sub.formName}</strong></td>
                    <td style={{ color: 'var(--gray-700)' }}>
                      {data.name || data.Name || '—'} · {data.email || data.Email || ''}
                    </td>
                    <td><span className={`status-badge status-${sub.status}`}>{sub.status}</span></td>
                    <td style={{ color: 'var(--gray-500)', fontSize: 13 }}>
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
