import { useState, useEffect } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Submissions() {
  const [forms, setForms] = useState([])
  const [activeForm, setActiveForm] = useState(null)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingSubs, setLoadingSubs] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios.get(`${API}/api/forms`)
      .then(res => {
        setForms(res.data)
        if (res.data.length > 0) selectForm(res.data[0])
        else setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const selectForm = async (form) => {
    setActiveForm(form)
    setSelected(null)
    setLoadingSubs(true)
    setLoading(false)
    try {
      const res = await axios.get(`${API}/api/forms/${form.slug}/submissions`)
      setSubmissions(res.data)
    } catch {
      setSubmissions([])
    } finally { setLoadingSubs(false) }
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/api/forms/submissions/${id}/status`, { status })
      setSubmissions(prev => prev.map(s => s._id === id ? { ...s, status } : s))
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }))
    } catch { }
  }

  const getFieldValue = (data, key) => {
    if (!data) return '—'
    const map = data instanceof Map ? Object.fromEntries(data) : data
    return map[key] || '—'
  }

  const getDataEntries = (data) => {
    if (!data) return []
    return data instanceof Map ? [...data.entries()] : Object.entries(data)
  }

  const newCount = submissions.filter(s => s.status === 'new').length

  if (loading) return <div className="loading">Loading...</div>

  if (forms.length === 0) {
    return (
      <div>
        <div className="admin-page-header"><h1>Submissions</h1></div>
        <div className="admin-card">
          <div className="empty-state"><p>No forms exist yet. Create a form first from the Forms page.</p></div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="admin-page-header">
        <h1>
          Submissions
          {newCount > 0 && (
            <span style={{ marginLeft: 10, background: 'var(--blue)', color: 'white', fontSize: 13, padding: '2px 10px', borderRadius: 20, fontFamily: 'var(--font-body)', fontWeight: 600 }}>
              {newCount} new
            </span>
          )}
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {forms.map(f => (
          <button
            key={f._id}
            onClick={() => selectForm(f)}
            style={{
              padding: '7px 18px', borderRadius: 20, fontSize: 14, border: '1.5px solid',
              borderColor: activeForm?._id === f._id ? 'var(--blue)' : 'var(--gray-200)',
              background: activeForm?._id === f._id ? 'var(--blue)' : 'white',
              color: activeForm?._id === f._id ? 'white' : 'var(--gray-700)',
              cursor: 'pointer', transition: 'all 0.15s'
            }}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
        <div className="admin-card">
          {loadingSubs ? (
            <div className="loading">Loading submissions...</div>
          ) : submissions.length === 0 ? (
            <div className="empty-state"><p>No submissions yet for this form.</p></div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map(sub => {
                  const data = sub.data || {}
                  const name = data.name || data.Name || '—'
                  const email = data.email || data.Email || '—'
                  return (
                    <tr
                      key={sub._id}
                      style={{ cursor: 'pointer', background: selected?._id === sub._id ? 'var(--blue-light)' : '' }}
                      onClick={() => { setSelected(sub); updateStatus(sub._id, sub.status === 'new' ? 'read' : sub.status) }}
                    >
                      <td><strong>{name}</strong></td>
                      <td style={{ color: 'var(--gray-500)', fontSize: 13 }}>{email}</td>
                      <td>
                        <span className={`status-badge status-${sub.status}`}>{sub.status}</span>
                      </td>
                      <td style={{ fontSize: 13, color: 'var(--gray-500)' }}>
                        {new Date(sub.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td onClick={e => e.stopPropagation()}>
                        <select
                          value={sub.status}
                          onChange={e => updateStatus(sub._id, e.target.value)}
                          style={{ padding: '4px 8px', border: '1px solid var(--gray-200)', borderRadius: 6, fontSize: 13, cursor: 'pointer' }}
                        >
                          <option value="new">new</option>
                          <option value="read">read</option>
                          <option value="replied">replied</option>
                        </select>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {selected && (
          <div className="admin-card" style={{ padding: 24, alignSelf: 'start' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: 16 }}>Submission Detail</strong>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: 20, color: 'var(--gray-500)', cursor: 'pointer' }}>×</button>
            </div>

            <div style={{ marginBottom: 16 }}>
              <span className={`status-badge status-${selected.status}`}>{selected.status}</span>
              <span style={{ fontSize: 12, color: 'var(--gray-500)', marginLeft: 10 }}>
                {new Date(selected.createdAt).toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {getDataEntries(selected.data).map(([key, val]) => (
                <div key={key} style={{ borderBottom: '1px solid var(--gray-200)', paddingBottom: 12 }}>
                  <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--gray-500)', marginBottom: 4 }}>{key}</div>
                  <div style={{ fontSize: 14, color: 'var(--black)', wordBreak: 'break-word' }}>{val || '—'}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['new', 'read', 'replied'].map(s => (
                <button
                  key={s}
                  className="action-btn"
                  style={{ background: selected.status === s ? 'var(--blue)' : '', color: selected.status === s ? 'white' : '', borderColor: selected.status === s ? 'var(--blue)' : '' }}
                  onClick={() => updateStatus(selected._id, s)}
                >
                  Mark {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
