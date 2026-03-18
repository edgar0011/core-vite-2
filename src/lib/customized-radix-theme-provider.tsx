import { Theme, type ThemeProps } from '@radix-ui/themes'
import { useSyncExternalStore } from 'react'

const mq = window.matchMedia('(prefers-color-scheme: dark)')

const subscribe = (cb: () => void) => {
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

const getSnapshot = (): 'light' | 'dark' => (mq.matches ? 'dark' : 'light')

export const RadixTheme = (props: ThemeProps) => {
  const appearance = useSyncExternalStore(subscribe, getSnapshot)

  return <Theme {...props} appearance={appearance} accentColor="blue" radius="small" />
}
