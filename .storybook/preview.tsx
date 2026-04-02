import '@radix-ui/themes/styles.css'
import '../src/index.css'

import { setThemeClassNames } from '@e1011/es-kit/hooks'
import { Theme } from '@radix-ui/themes'
import type { Preview } from '@storybook/react'
import { useEffect } from 'react'
import { useDarkMode } from 'storybook-dark-mode'

// Map es-kit theme classes to our CSS selectors
setThemeClassNames({ dark: 'dark', light: 'light' })

/**
 * Decorator that syncs storybook-dark-mode toggle with our theme classes.
 * Adds/removes .dark on document.body so the CSS variables switch.
 */
const ThemeDecorator = ({ children }: { children: React.ReactNode }) => {
  const isDark = useDarkMode()

  useEffect(() => {
    document.body.classList.toggle('dark', isDark)
    document.body.classList.toggle('light', !isDark)
    // Force body to use our themed CSS vars so Storybook doesn't override
    document.body.style.backgroundColor = 'hsl(var(--background))'
    document.body.style.color = 'hsl(var(--foreground))'
  }, [isDark])

  return children
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    darkMode: {
      // CSS class applied to body for dark mode
      darkClass: ['dark'],
      lightClass: ['light'],
      // Use light as default
      current: 'light',
      // Apply class to the preview body element
      classTarget: 'body',
      // Style the Storybook UI itself
      stylePreview: true,
    },
  },
}

export const decorators = [
  (Story: React.FC) => (
    <ThemeDecorator>
      <Theme>
        <Story />
      </Theme>
    </ThemeDecorator>
  ),
]

export default preview
