import './sandbox/decorators/decorator-example.js'
import './sandbox/decorators/decorator-example-ts.ts'

import { Link } from '@radix-ui/themes'
import { Link as RouterLink, Outlet } from 'react-router'

import { Heading } from '~/components/atoms/typography'

import { BoxLayout, LayoutBox } from './components/es-kit/components/container/layoutBox/LayoutBox'
import { Box } from './components/molecules/box/box.tsx'
import { RadixTheme } from './lib/customized-radix-theme-provider.tsx'
import { configBasePath } from './router/config.tsx'
import { NavLink } from './router/navlink.tsx'

function App() {
  return (
    <RadixTheme className="min-h-screen w-full">
      <BoxLayout column style={{ minHeight: '100vh', width: '100%' }}>
        {/* Navigation */}
        <BoxLayout
          padding="12px 24px"
          gap="8px"
          align="center"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 40,
            borderBottom: '1px solid hsl(var(--border))',
            backgroundColor: 'hsl(var(--card))',
            backdropFilter: 'blur(12px)',
          }}
        >
          <RouterLink
            to={`${configBasePath}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginRight: '16px',
              fontSize: '1.125rem',
              fontWeight: 700,
              letterSpacing: '-0.025em',
              color: 'hsl(var(--primary))',
              textDecoration: 'none',
            }}
          >
            <span
              style={{
                display: 'flex',
                width: 24,
                height: 24,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 4,
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                fontSize: '0.75rem',
                fontWeight: 700,
              }}
            >
              C
            </span>
            Core V2
          </RouterLink>
          <BoxLayout gap="4px">
            <NavLink to={`${configBasePath}`}>Home</NavLink>
            <NavLink to={`${configBasePath}/main`}>Main</NavLink>
            <NavLink to={`${configBasePath}/examples`}>Examples</NavLink>
          </BoxLayout>
          <BoxLayout flex />
        </BoxLayout>

        {/* Content */}
        <BoxLayout
          column
          padding="24px 24px 48px"
          gap="24px"
          style={{ maxWidth: 1024, margin: '0 auto', width: '100%' }}
        >
          {/* Hero Cards */}
          <LayoutBox column gap="16px">
            <Heading>Box Component</Heading>
            <Box
              buttonLabel="Box Button"
              padding="20px"
              gap="12px"
              style={{
                borderRadius: 12,
                border: '1px solid hsl(var(--border))',
                backgroundColor: 'hsl(var(--card))',
              }}
            />
          </LayoutBox>

          <LayoutBox column gap="16px">
            <Heading>Box Component 2</Heading>
            <Box
              buttonLabel="Box Button 2"
              padding="20px"
              gap="12px"
              style={{
                borderRadius: 12,
                border: '1px solid hsl(var(--border))',
                backgroundColor: 'hsl(var(--card))',
              }}
            />
          </LayoutBox>

          <BoxLayout
            padding="20px"
            style={{
              borderRadius: 12,
              border: '1px solid hsl(var(--border))',
              backgroundColor: 'hsl(var(--card))',
            }}
          >
            <Link href="https://www.radix-ui.com/" target="_blank">
              Hello world!
            </Link>
          </BoxLayout>

          {/* Route Outlet */}
          <Outlet />
        </BoxLayout>
      </BoxLayout>
    </RadixTheme>
  )
}

export default App
