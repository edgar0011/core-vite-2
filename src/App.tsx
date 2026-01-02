import './App.css'
import './sandbox/decorators/decorator-example.js'
import './sandbox/decorators/decorator-example-ts.ts'

import { Theme } from '@radix-ui/themes'
import { useState } from 'react'

import viteLogo from '/vite.svg'

import reactLogo from './assets/react.svg'
import { LayoutBox } from './components/es-kit/components/container/layoutBox/LayoutBox'
import { Box } from './components/molecules/box/box.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Theme>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      <LayoutBox>
        <h1>LayoutBox</h1>
        <Box buttonLabel="Box Button" />
      </LayoutBox>
    </Theme>
  )
}

export default App
