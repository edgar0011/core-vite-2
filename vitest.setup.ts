// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom/vitest'
import 'whatwg-fetch'

import { cleanup, configure } from '@testing-library/react'
// eslint-disable-next-line no-restricted-imports
import React from 'react'
import { afterEach, vi } from 'vitest'
// Expose React on the global scope for legacy helpers that still assume it exists.
;(globalThis as typeof globalThis & { React: typeof React }).React = React

configure((existingConfig) => ({
  ...existingConfig,
  getElementError: (message) => new Error(message ?? undefined),
}))

afterEach(() => {
  cleanup()
})

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })

  Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      disconnect: vi.fn(),
      observe: vi.fn(),
      unobserve: vi.fn(),
    })),
  })
}
