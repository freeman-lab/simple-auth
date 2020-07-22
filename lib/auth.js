import useSWR from 'swr'
import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'
import { useSession } from './session'
import Layout from '../components/layout'

export function useAuth() {
  const router = useRouter()
  const [ { token, username }, ] = useSession()

  const fetcher = (url, token) => fetch(
    url, 
    { headers: { 'Authorization': token }}
  ).then(r => r.json())

  const { data, error } = useSWR(['/api/auth', token], fetcher)
  const loading = !data && !error

  return { data, error, loading }
}

export const withAuth = (Component) => () => {
  const router = useRouter()
  const { data, error, loading } = useAuth()

  useEffect(() => {
    if ((data && !data.authed) || error) {
      window.location.assign(`/login?redirect=${encodeURIComponent(router.pathname)}`)
    }
  }, [data])

  if (data && data.authed) {
    return <Component/>
  } else {
    return <Layout status={'authenticating'}></Layout>
  }
}
