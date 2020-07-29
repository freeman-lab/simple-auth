import { useState } from 'react'
import { ThemeProvider } from 'theme-ui'
import { SessionProvider } from '../lib/session'
import theme from '../theme'

export default ({ Component, pageProps }) => {
  const [session, setSession] = useState({ token: null, username: null })
  return (
    <SessionProvider session={session} setSession={setSession}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}