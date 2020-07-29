import { Box, Text, Button, Link, Grid } from 'theme-ui'
import { default as NextLink } from 'next/link'
import { useSession } from '../lib/session'
import { useAuth } from '../lib/auth'

const Layout = ({ children, status }) => {
  const [ session, setSession ] = useSession()
  const { authed } = useAuth()

  const user = authed ?
    `Logged in as ${session.username}` :
    `Logged out`

  const logout = () => {
    setSession({ token: null, username: null })
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
              <Link onClick={logout}>
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
