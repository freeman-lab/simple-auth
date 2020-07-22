import { Box, Button, sHeading, Text, Link } from 'theme-ui'
import { withAuth } from '../lib/auth'
import { default as NextLink } from 'next/link'
import { useSession } from '../lib/session'
import Layout from '../components/layout'

function Private() {
  const [ , setSession ] = useSession()

  const logout = () => {
    setSession({ token: null, username: null })
  }

  return (
    <Layout>
      <Box sx={{ fontSize: [6] }}>
        This page is private.
      </Box>
      <NextLink href='/' passHref={true}>
        <Link sx={{ fontSize: [4], display: 'block', mt: [4] }}>
          Link back to public page.
        </Link>
      </NextLink>
      <Button sx={{ mt: [4], px: [2], py: [1] }} onClick={logout}>
        Logout
      </Button>
    </Layout>
  )
}

export default withAuth(Private)
