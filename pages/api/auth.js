const jwt = require('jsonwebtoken')
const safeCompare = require('safe-compare')

const secret = process.env.JWT_SECRET

const users = [
  {
    username: 'dwolo',
    password: process.env.PASSWORD,
  },
]

export default function handler(req, res) {
  if (req.method === 'POST') {
    const user = users.find((d) => safeCompare(d.password, req.body.password))
    if (user) {
      const token = jwt.sign({ username: user.username }, secret, {
        expiresIn: '1h',
      })
      res.status(200).json({ token: token })
    } else {
      res.status(403).json({ message: 'password not recognized' })
    }
  }

  if (req.method === 'GET') {
    const token = req.headers.authorization
    try {
      const decoded = jwt.verify(token, secret)
      res.status(200).json({ username: decoded.username, authed: true })
    } catch (err) {
      res.status(403).json({ username: null, authed: false })
    }
  }
}
