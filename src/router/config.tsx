import { createBrowserRouter } from 'react-router'

import App from '~/App'
import { Examples } from '~/components/routes/examples/examples'
import { Main } from '~/components/routes/main/main'

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
