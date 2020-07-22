import { useState } from 'react'
import { ThemeProvider } from 'theme-ui'
import { SessionProvider } from '../lib/session'
import { deep } from '@theme-ui/presets'

export default ({ Component, pageProps }) => {
  const [session, setSession] = useState({ token: null, username: null })
  return (
    <SessionProvider session={session} setSession={setSession}>
      <ThemeProvider theme={deep}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}