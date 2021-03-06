import { Box, Text, Input, Button } from 'theme-ui'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useToken } from '../lib/token'
import Layout from '../components/layout'

function Login({ origin }) {
  const router = useRouter()
  const [, setToken] = useToken()
  const [status, setStatus] = useState(null)
  const [password, setPassword] = useState('')

  const { redirect } = router.query

  const disabled = ['authenticating', 'submitting'].includes(status)

  async function submit(e) {
    setStatus('submitting')
    e.preventDefault()
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ password: password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status !== 200) {
      setStatus('invalid')
      setTimeout(() => {
        setStatus(null)
      }, 1000)
    } else {
      const { token } = await res.json()
      setToken(token)
      setStatus('authenticating')
      if (redirect) {
        router.push(redirect)
      } else {
        router.push('/')
      }
    }
  }

  return (
    <Layout status={status}>
      <Text sx={{ fontSize: [6] }}>
        Please login
      </Text>
      <Text sx={{ my: [3], fontSize: [4] }}>
        Enter a password to continue
      </Text>
      <Box as='form' onSubmit={submit} sx={{ fontSize: [4], mb: [4] }}>
        <Input
          sx={{
            width: ['200px'],
            mt: [2],
            borderStyle: 'solid',
            borderWidth: '0px',
            borderBottomWidth: '1px',
            borderRadius: '0px',
          }}
          type='password'
          name='password'
          id='password'
          value={password}
          placeholder='Password?'
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <Button
          disabled={disabled}
          onClick={submit}
          type='submit'
          sx={{
            '&:hover': {
              background: disabled ? 'muted' : 'primary',
            },
            mt: [3]
          }}
        >
        Submit
        </Button>
      </Box>
    </Layout>
  )
}

export default Login
