import { useState } from 'react'
import { ThemeProvider } from 'theme-ui'
import { TokenProvider } from '../lib/token'
import theme from '../theme'

const App = ({ Component, pageProps }) => {
  const [token, setToken] = useState(null)
  return (
    <TokenProvider token={token} setToken={setToken}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </TokenProvider>
  )
}

export default App