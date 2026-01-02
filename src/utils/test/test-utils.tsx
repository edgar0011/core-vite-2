/* eslint-disable react-refresh/only-export-components */
import type { RenderOptions, RenderResult } from '@testing-library/react'
import { configure, render } from '@testing-library/react'
import type { FC, PropsWithChildren, ReactElement } from 'react'

type Props = PropsWithChildren<unknown>

const AllTheProviders: FC<Props> = ({ children }: Props): ReactElement<unknown> => {
  return (<div id="unit-test-wrapper">{children}</div>) as ReactElement<unknown>
}

const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

configure({ testIdAttribute: 'data-test-id' })

// override render method
export { customRender as render }
