import { base } from '@theme-ui/presets'

export default {
  ...base,
  buttons: {
    primary: {
      fontSize: [3],
      px: [2],
      py: [1],
      width: '90px',
      cursor: 'pointer',
      bg: 'primary',
      '&:hover': {
        bg: 'secondary',
      },
    }
  }
}