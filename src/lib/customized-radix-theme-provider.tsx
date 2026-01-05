import { Theme, type ThemeProps } from '@radix-ui/themes'

export const RadixTheme = (props: ThemeProps) => (
  <Theme {...props} accentColor="blue" radius="small" />
)
