import { Box, Text, Button, Link, Grid } from 'theme-ui'
import { default as NextLink } from 'next/link'
import { useToken } from '../lib/token'
import { useAuth } from '../lib/auth'

const Layout = ({ children, status }) => {
  const [ , setToken ] = useToken()
  const { authed, username } = useAuth()

  const user = authed ?
    `Logged in as ${username}` :
    `Logged out`

  const logout = () => {
    setToken(null)
  }

  return (
    <Box>
      <Box
        sx={{
          width: '50%',
          position: 'absolute',
          height: '80px',
          top: 50,       
          mx: [5],
          fontSize: [3],
        }}
      >
        <Grid columns={[4]}>
          <NextLink href='/' passHref={true}>
            <Link>
              Home
            </Link>
          </NextLink>
          <Text>{user}</Text>
          <Text>{status}</Text>
          {authed &&
            <Link href='/' onClick={logout}>
              Logout
            </Link>
          }
          {!authed &&
            <NextLink href='/login' passHref={true}>
              <Link>
                Login
              </Link>
            </NextLink>
          }
        </Grid>
      </Box>
      <Box sx={{ mx: [5], mt: [6] }}>
      {children}
      </Box>
    </Box>
  )
}

export default Layout
