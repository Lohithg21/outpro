require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')

async function createAdmin() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/outpro')

  const email = process.env.ADMIN_EMAIL || 'admin@outpro.in'
  const password = process.env.ADMIN_PASSWORD || 'Admin@2025'
  const name = 'Admin'

  const existing = await User.findOne({ email })
  if (existing) {
    console.log('Admin already exists:', email)
    await mongoose.disconnect()
    return
  }

  await User.create({ name, email, password, role: 'admin' })
  console.log('Admin created successfully')
  console.log('Email:', email)
  console.log('Password: (set in .env as ADMIN_PASSWORD)')
  await mongoose.disconnect()
}

createAdmin().catch(err => { console.error(err); process.exit(1) })
