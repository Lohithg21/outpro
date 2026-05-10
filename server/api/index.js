const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

let isConnected = false
async function connectDB() {
  if (isConnected) return
  await mongoose.connect(process.env.MONGO_URI)
  isConnected = true
}

app.use(async (req, res, next) => {
  await connectDB()
  next()
})

app.use('/api/auth', require('../routes/auth'))
app.use('/api/contact', require('../routes/contact'))
app.use('/api/posts', require('../routes/posts'))
app.use('/api/forms', require('../routes/forms'))
app.use('/api/pages', require('../routes/pages'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

module.exports = app
