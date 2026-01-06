import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import { BoxLayout } from './components/es-kit/components/container/layoutBox/LayoutBox'
import { router } from './router/config'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BoxLayout column gap="20px" padding="20px">
      <RouterProvider router={router} />
    </BoxLayout>
  </StrictMode>,
)
