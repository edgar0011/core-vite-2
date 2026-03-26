import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Heading } from './components/atoms/typography'
import { BoxLayout } from './components/es-kit/components/container/layoutBox/LayoutBox'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BoxLayout column gap="20px" padding="20px">
      <Heading>Core vite 2, simple!</Heading>
    </BoxLayout>
  </StrictMode>,
)
