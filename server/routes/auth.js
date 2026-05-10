const router = require('express').Router()
const User = require('../models/User')
const { signToken, verifyToken } = require('../middleware/auth')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required.' })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' })
    }
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ error: 'An account with this email already exists.' })

    const user = new User({ name, email, password, role: 'user' })
    await user.save()

    const token = signToken({ id: user._id, role: user.role, name: user.name })
    res.status(201).json({ token, user })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' })

    const user = await User.findOne({ email }).select('+password')
    if (!user) return res.status(401).json({ error: 'Invalid email or password.' })

    const match = await user.comparePassword(password)
    if (!match) return res.status(401).json({ error: 'Invalid email or password.' })

    const token = signToken({ id: user._id, role: user.role, name: user.name })
    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' })

    const user = await User.findOne({ email, role: 'admin' }).select('+password')
    if (!user) return res.status(401).json({ error: 'Invalid credentials.' })

    const match = await user.comparePassword(password)
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' })

    const token = signToken({ id: user._id, role: 'admin', name: user.name })
    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ error: 'Server error.' })
  }
})

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ error: 'User not found.' })
    res.json(user)
  } catch {
    res.status(500).json({ error: 'Server error.' })
  }
})

module.exports = router
