const router = require('express').Router()
const Form = require('../models/Form')
const FormSubmission = require('../models/FormSubmission')

router.get('/', async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 })
    res.json(forms)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const form = await Form.findOne({ slug: req.params.slug, active: true })
    if (!form) return res.status(404).json({ error: 'Form not found.' })
    res.json(form)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, slug, description, fields } = req.body
    if (!name) return res.status(400).json({ error: 'Form name is required.' })

    const form = new Form({ name, slug, description, fields: fields || [] })
    await form.save()
    res.status(201).json(form)
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: 'A form with this slug already exists.' })
    res.status(500).json({ error: 'Server error.' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const form = await Form.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!form) return res.status(404).json({ error: 'Form not found.' })
    res.json(form)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Form.findByIdAndDelete(req.params.id)
    res.json({ message: 'Form deleted.' })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.post('/:slug/submit', async (req, res) => {
  try {
    const form = await Form.findOne({ slug: req.params.slug, active: true })
    if (!form) return res.status(404).json({ error: 'Form not found.' })

    
    const missing = form.fields
      .filter(f => f.required && !req.body[f.name])
      .map(f => f.label)

    if (missing.length > 0) {
      return res.status(400).json({ error: `Required fields missing: ${missing.join(', ')}` })
    }

    
    const knownFields = form.fields.map(f => f.name)
    const data = {}
    knownFields.forEach(key => {
      if (req.body[key] !== undefined) data[key] = req.body[key]
    })

    const submission = new FormSubmission({
      formId: form._id,
      formSlug: form.slug,
      formName: form.name,
      data,
      ipAddress: req.ip,
    })
    await submission.save()
    res.status(201).json({ message: 'Form submitted successfully.', id: submission._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error.' })
  }
})

router.get('/:slug/submissions', async (req, res) => {
  try {
    const submissions = await FormSubmission.find({ formSlug: req.params.slug }).sort({ createdAt: -1 })
    res.json(submissions)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.patch('/submissions/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' })
    }
    const submission = await FormSubmission.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    res.json(submission)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

module.exports = router
