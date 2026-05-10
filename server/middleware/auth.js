const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || 'outpro_jwt_secret_change_in_production'

function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' })
}

function verifyToken(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided.' })
  }
  try {
    req.user = jwt.verify(header.split(' ')[1], SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' })
  }
}

function requireAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required.' })
    }
    next()
  })
}

module.exports = { signToken, verifyToken, requireAdmin }
