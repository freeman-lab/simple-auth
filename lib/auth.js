import useSWR from 'swr'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from './session'
import Layout from '../components/layout'

export function useAuth() {
  const router = useRouter()
  const [ { token }, ] = useSession()

  const fetcher = (url, token) => fetch(
    url, 
    { headers: { 'Authorization': token }}
  ).then(r => r.json())

  const { data, error } = useSWR(['/api/auth', token], fetcher)
  const loading = !data && !error
  const authed = data && data.authed
  const username = data && data.username

  return { data, error, loading, authed, username }
}

export const withAuth = (Component) => () => {
  const router = useRouter()
  const { data, error, authed } = useAuth()

  useEffect(() => {
    if ((data && !data.authed) || error) {
      window.location.assign(`/login?redirect=${encodeURIComponent(router.pathname)}`)
    }
  }, [data])

  if (authed) {
    return <Component/>
  } else {
    return <Layout status={'authenticating'}></Layout>
  }
}
