import { Box, Text } from 'theme-ui'

const Layout = ({ children, status }) => {
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          position: 'sticky',
          height: '50px',
          top: 0,          
        }}
      >
        <Text>{status}</Text>
      </Box>
      <Box sx={{ mx: [5], mt: [2] }}>
      {children}
      </Box>
    </Box>
  )
}

export default Layout
