import { useState, useEffect } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const FIELD_TYPES = ['text', 'email', 'tel', 'number', 'textarea', 'select', 'radio', 'checkbox', 'date']

const newField = () => ({ label: '', name: '', type: 'text', required: false, options: '' })

export default function Forms() {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({ name: '', slug: '', description: '', fields: [] })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const res = await axios.get(`${API}/api/forms`)
      setForms(res.data)
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setFormData({ name: '', slug: '', description: '', fields: [newField()] })
    setEditing(null); setError(''); setShowModal(true)
  }

  const openEdit = (f) => {
    setFormData({
      ...f,
      fields: f.fields.map(fld => ({ ...fld, options: (fld.options || []).join(', ') }))
    })
    setEditing(f._id); setError(''); setShowModal(true)
  }

  const closeModal = () => { setShowModal(false); setEditing(null) }

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))

  const updateField = (i, key, val) => {
    setFormData(p => {
      const fields = [...p.fields]
      fields[i] = { ...fields[i], [key]: val }
      return { ...p, fields }
    })
  }

  const addField = () => setFormData(p => ({ ...p, fields: [...p.fields, newField()] }))
  const removeField = (i) => setFormData(p => ({ ...p, fields: p.fields.filter((_, idx) => idx !== i) }))

  const handleSave = async () => {
    if (!formData.name) { setError('Form name is required.'); return }
    setSaving(true); setError('')
    try {
      const payload = {
        ...formData,
        fields: formData.fields
          .filter(f => f.label && f.name)
          .map((f, i) => ({
            ...f,
            order: i,
            options: ['select', 'radio', 'checkbox'].includes(f.type)
              ? f.options.split(',').map(o => o.trim()).filter(Boolean)
              : []
          }))
      }
      if (editing) {
        await axios.put(`${API}/api/forms/${editing}`, payload)
      } else {
        await axios.post(`${API}/api/forms`, payload)
      }
      await load(); closeModal()
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this form? Submissions will remain in the database.')) return
    try { await axios.delete(`${API}/api/forms/${id}`); await load() } catch { }
  }

  const toggleActive = async (f) => {
    try {
      await axios.put(`${API}/api/forms/${f._id}`, { ...f, active: !f.active })
      await load()
    } catch { }
  }

  if (loading) return <div className="loading">Loading forms...</div>

  return (
    <div>
      <div className="admin-page-header">
        <h1>Forms</h1>
        <button className="btn btn-primary" onClick={openNew}>+ New Form</button>
      </div>

      <div className="admin-card">
        {forms.length === 0 ? (
          <div className="empty-state">
            <p>No forms yet. Create one to start collecting submissions.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Form Name</th>
                <th>Slug</th>
                <th>Fields</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map(f => (
                <tr key={f._id}>
                  <td>
                    <strong>{f.name}</strong>
                    {f.description && (
                      <><br /><span style={{ fontSize: 12, color: 'var(--gray-500)' }}>{f.description}</span></>
                    )}
                  </td>
                  <td>
                    <code style={{ background: 'var(--gray-100)', padding: '2px 8px', borderRadius: 4, fontSize: 13 }}>
                      {f.slug}
                    </code>
                  </td>
                  <td>{f.fields.length} fields</td>
                  <td>
                    <span
                      className={`status-badge ${f.active ? 'status-published' : 'status-draft'}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => toggleActive(f)}
                      title="Click to toggle"
                    >
                      {f.active ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn" onClick={() => openEdit(f)}>Edit</button>
                    <button className="action-btn danger" onClick={() => handleDelete(f._id)}>Delete</button>
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
              <h2>{editing ? 'Edit Form' : 'New Form'}</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>

            {error && (
              <div style={{ marginBottom: 14, padding: '10px 14px', background: '#FEF2F2', borderRadius: 8, color: '#EF4444', fontSize: 14 }}>
                {error}
              </div>
            )}

            <div className="form-group">
              <label>Form Name *</label>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Newsletter Signup" />
            </div>

            <div className="grid-2" style={{ gap: 14 }}>
              <div className="form-group">
                <label>Slug (auto-generated if blank)</label>
                <input name="slug" value={formData.slug} onChange={handleChange} placeholder="newsletter-signup" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input name="description" value={formData.description} onChange={handleChange} placeholder="What is this form for?" />
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <strong style={{ fontSize: 14 }}>Fields</strong>
                <button className="action-btn primary" onClick={addField}>+ Add Field</button>
              </div>

              {formData.fields.length === 0 && (
                <p style={{ fontSize: 13, color: 'var(--gray-500)', textAlign: 'center', padding: '12px 0' }}>
                  No fields yet. Click "+ Add Field" to start.
                </p>
              )}

              {formData.fields.map((field, i) => (
                <div key={i} className="field-row">
                  <input
                    value={field.label}
                    onChange={e => updateField(i, 'label', e.target.value)}
                    placeholder="Label"
                    style={{ flex: '1 1 130px' }}
                  />
                  <input
                    value={field.name}
                    onChange={e => updateField(i, 'name', e.target.value)}
                    placeholder="Key (no spaces)"
                    style={{ flex: '1 1 130px' }}
                  />
                  <select value={field.type} onChange={e => updateField(i, 'type', e.target.value)} style={{ flex: '0 0 110px' }}>
                    {FIELD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {['select', 'radio', 'checkbox'].includes(field.type) && (
                    <input
                      value={field.options}
                      onChange={e => updateField(i, 'options', e.target.value)}
                      placeholder="opt1, opt2, opt3"
                      style={{ flex: '2 1 160px' }}
                    />
                  )}
                  <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={e => updateField(i, 'required', e.target.checked)}
                    />
                    Required
                  </label>
                  <button className="remove-field" onClick={() => removeField(i)}>×</button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="action-btn" onClick={closeModal}>Cancel</button>
              <button className="action-btn primary" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Form'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
