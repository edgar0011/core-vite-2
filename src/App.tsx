import './sandbox/decorators/decorator-example.js'
import './sandbox/decorators/decorator-example-ts.ts'

import { useState } from 'react'

import viteLogo from '/vite.svg'

import reactLogo from './assets/react.svg'
import { LayoutBox } from './components/es-kit/components/container/layoutBox/LayoutBox'
import { Box } from './components/molecules/box/box.tsx'
import { RadixTheme } from './lib/customized-radix-theme-provider.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RadixTheme className="min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col items-center gap-8 p-4 md:p-8">
        <div className="flex items-center gap-8">
          <a
            href="https://vite.dev"
            target="_blank"
            className="transition-transform hover:scale-110"
          >
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            className="transition-transform hover:scale-110"
          >
            <img src={reactLogo} className="h-24 w-24" alt="React logo" />
          </a>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Vite + React</h1>

        <div className="flex flex-col items-center gap-4 rounded-lg bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:bg-gray-800/80">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600"
          >
            count is {count}
          </button>
          <p className="text-center text-gray-700 dark:text-gray-200">
            Edit{' '}
            <code className="rounded bg-gray-200 px-2 py-1 text-gray-800 dark:bg-gray-700 dark:text-gray-100">
              src/App.tsx
            </code>{' '}
            and save to test HMR
          </p>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          Click on the Vite and React logos to learn more
        </p>

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
      </div>
    </RadixTheme>
  )
}

export default App
