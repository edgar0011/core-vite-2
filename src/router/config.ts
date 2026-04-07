import { lazy } from 'react'
import { createBrowserRouter } from 'react-router'

import App from '~/App'

const Main = lazy(() => import('~/components/routes/main/main').then((m) => ({ default: m.Main })))
const Examples = lazy(() =>
  import('~/components/routes/examples/examples').then((m) => ({ default: m.Examples })),
)

export const configBasePath = 'CORE_VITE_CONFIG_BASE_PATH'

export const router = createBrowserRouter([
  {
    path: `/${configBasePath}`,
    Component: App,
    children: [
      {
        path: 'main',
        Component: Main,
      },
      {
        path: 'examples',
        Component: Examples,
        loader: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          return {
            message: 'Hello from the loader!',
          }
        },
      },
    ],
  },
])
