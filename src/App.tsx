import './sandbox/decorators/decorator-example.js'
import './sandbox/decorators/decorator-example-ts.ts'

import { Link } from '@radix-ui/themes'
import { Outlet } from 'react-router'

import { Heading } from '~/components/atoms/typography'

import { BoxLayout, LayoutBox } from './components/es-kit/components/container/layoutBox/LayoutBox'
import { Box } from './components/molecules/box/box.tsx'
import { RadixTheme } from './lib/customized-radix-theme-provider.tsx'
import { configBasePath } from './router/config.tsx'
import { NavLink } from './router/navlink.tsx'

function App() {
  return (
    <RadixTheme className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col items-center gap-8 p-4 md:p-8">
        <BoxLayout gap="20px">
          <NavLink to={`${configBasePath}`}>Home</NavLink>
          <NavLink to={`${configBasePath}/main`}>Main</NavLink>
          <NavLink to={`${configBasePath}/examples`}>Examples</NavLink>
        </BoxLayout>
        <div className="flex w-full max-w-4xl flex-col gap-6">
          <LayoutBox column>
            <Heading>Box Component</Heading>
            <Box
              buttonLabel="Box Button"
              padding="20px"
              className="rounded-md bg-gray-600"
              gap="12px"
            />
          </LayoutBox>

          <LayoutBox column>
            <Heading>Box Component 2</Heading>
            <Box
              buttonLabel="Box Button 2"
              padding="20px"
              className="rounded-md bg-gray-600"
              gap="12px"
            />
          </LayoutBox>

          <LayoutBox>
            <Link href="https://www.radix-ui.com/" target="_blank">
              Hello world!
            </Link>
          </LayoutBox>
        </div>
        <Outlet />
      </div>
    </RadixTheme>
  )
}

export default App
