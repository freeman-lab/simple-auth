import { Box, Heading, Text, Link, Button } from 'theme-ui'
import { default as NextLink } from 'next/link'
import { useSession } from '../lib/session'
import Layout from '../components/layout'

function Index() {
  const [ , setSession ] = useSession()

  const logout = () => {
    setSession({ token: null, username: null })
  }

  return (
    <Layout>
      <Text sx={{ fontSize: [6] }}>
        This page is public.
      </Text>
      <NextLink href='/private' passHref={true}>
        <Link sx={{ fontSize: [4], display: 'block', mt: [4] }}>
          Link to private page.
        </Link>
      </NextLink>
      <Button sx={{ mt: [4], px: [2], py: [1] }} onClick={logout}>
        Logout
      </Button>
    </Layout>
  )
}

export default Index
