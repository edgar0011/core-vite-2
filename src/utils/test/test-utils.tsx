/* eslint-disable react-refresh/only-export-components */
import type { RenderOptions, RenderResult } from '@testing-library/react'
import { configure, render, waitFor } from '@testing-library/react'
import type { FC, PropsWithChildren, ReactElement } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router'

type Props = PropsWithChildren<unknown>

const AllTheProviders: FC<Props> = ({ children }: Props): ReactElement<unknown> => {
  return (<div id="unit-test-wrapper">{children}</div>) as ReactElement<unknown>
}

const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options })

/**
 * Options for renderWithRouter
 */
export interface RenderWithRouterOptions extends Omit<RenderOptions, 'wrapper'> {
  /** The route path to use (default: '/') */
  route?: string
  /** Mock loader data to return from useLoaderData */
  loaderData?: unknown
}

/**
 * Render a component within a data router context.
 * Use this when testing components that use useLoaderData or other data router hooks.
 * This is an async function because the router needs to resolve the loader before rendering.
 */
const renderWithRouter = async (
  ui: ReactElement,
  { route = '/', loaderData = {}, ...renderOptions }: RenderWithRouterOptions = {},
): Promise<RenderResult> => {
  const router = createMemoryRouter(
    [
      {
        path: route,
        element: <AllTheProviders>{ui}</AllTheProviders>,
        loader: () => loaderData,
        hydrateFallbackElement: <div>Loading...</div>,
      },
    ],
    { initialEntries: [route] },
  )

  const result = render(<RouterProvider router={router} />, renderOptions)

  // Wait for the router to finish loading
  await waitFor(() => {
    expect(router.state.navigation.state).toBe('idle')
  })

  return result
}

// re-export everything
export * from '@testing-library/react'

configure({ testIdAttribute: 'data-test-id' })

// override render method
export { customRender as render, renderWithRouter }
