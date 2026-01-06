import './sandbox/decorators/decorator-example.js'
import './sandbox/decorators/decorator-example-ts.ts'

import { Outlet } from 'react-router'

import { BoxLayout, LayoutBox } from './components/es-kit/components/container/layoutBox/LayoutBox'
import { Box } from './components/molecules/box/box.tsx'
import { RadixTheme } from './lib/customized-radix-theme-provider.tsx'
import { NavLink } from './router/navlink.tsx'

function App() {
  return (
    <RadixTheme className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col items-center gap-8 p-4 md:p-8">
        <BoxLayout gap="20px">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/main">Main</NavLink>
          <NavLink to="/examples">Examples</NavLink>
        </BoxLayout>
        <div className="flex w-full max-w-4xl flex-col gap-6">
          <LayoutBox column>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              Box Component
            </h2>
            <Box
              buttonLabel="Box Button"
              padding="20px"
              className="rounded-md bg-gray-600"
              gap="12px"
            />
          </LayoutBox>

          <LayoutBox column>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              Box Component 2
            </h2>
            <Box
              buttonLabel="Box Button 2"
              padding="20px"
              className="rounded-md bg-gray-600"
              gap="12px"
            />
          </LayoutBox>

          <LayoutBox>
            <h1 className="text-3xl font-bold text-blue-400 underline">Hello world!</h1>
          </LayoutBox>
        </div>
        <Outlet />
      </div>
    </RadixTheme>
  )
}

export default App
