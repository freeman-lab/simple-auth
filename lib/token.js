import { createContext, useContext } from 'react'

const Token = createContext(null)

export const useToken = () => {
  return useContext(Token)
}

export const TokenProvider = ({token, setToken, children}) => {
  return <Token.Provider value={[token, setToken]}>
    {children}
  </Token.Provider>
}