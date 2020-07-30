import { Box, Link } from 'theme-ui'
import { default as NextLink } from 'next/link'
import { withAuth } from '../lib/auth'
import Layout from '../components/layout'

function Private() {
  return (
    <Layout>
      <Box sx={{ fontSize: [6] }}>
        This page is private.
      </Box>
      <NextLink href='/' passHref={true}>
        <Link sx={{ fontSize: [4], display: 'block', mt: [4] }}>
          Back to public page.
        </Link>
      </NextLink>
    </Layout>
  )
}

export default withAuth(Private)
