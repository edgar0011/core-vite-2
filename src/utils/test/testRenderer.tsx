/* eslint-disable @typescript-eslint/no-explicit-any */
import { configure, render, type RenderOptions, type RenderResult } from '@testing-library/react'
import type { FC, PropsWithChildren, ReactElement } from 'react'

type Props = PropsWithChildren<any>

const AllTheProviders: FC<Props> = function AllTheProviders({
  children,
}: Props): ReactElement<any> {
  return (<div id="es1011-test-wrapper">{children}</div>) as ReactElement<any>
}

const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react'

configure({ testIdAttribute: 'data-test-id' })

// override render method
export { customRender as render }
