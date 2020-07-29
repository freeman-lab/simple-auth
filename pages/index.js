import { Box, Heading, Text, Link, Button } from 'theme-ui'
import { default as NextLink } from 'next/link'
import Layout from '../components/layout'

function Index() {
  return (
    <Layout>
      <Text sx={{ fontSize: [6] }}>
        This page is public.
      </Text>
      <NextLink href='/private' prefetch={false} passHref={true}>
        <Link sx={{ fontSize: [4], display: 'block', mt: [4] }}>
          To private page.
        </Link>
      </NextLink>
    </Layout>
  )
}

export default Index
