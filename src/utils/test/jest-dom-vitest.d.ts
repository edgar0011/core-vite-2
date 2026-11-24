// Workaround for testing-library/jest-dom#738: jest-dom 7 augments Vitest's
// `Assertion<T>`, but Vitest 5 changed it to `Assertion<R, T>` and expects
// matcher libraries to augment `Matchers<R, T>` instead, so every jest-dom
// matcher disappears from the types (runtime is unaffected).
// Delete this file once jest-dom ships the fix.
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare module 'vitest' {
  // Type parameters must match Vitest's declaration exactly for the merge, so
  // `T` stays even though jest-dom's matchers don't use it.
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Matchers<
    R extends void | Promise<void> = void | Promise<void>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    T = unknown,
  > extends TestingLibraryMatchers<unknown, R> {}
}
