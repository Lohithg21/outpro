const router = require('express').Router()
const Contact = require('../models/Contact')

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, budget, message } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }
    const contact = new Contact({ name, email, phone, service, budget, message })
    await contact.save()
    res.status(201).json({ message: 'Contact form submitted successfully.', id: contact._id })
  } catch (err) {
    console.error('Contact form error:', err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json(contacts)
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

module.exports = router
