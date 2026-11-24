# Web components — core-vite-2

Custom elements live in `src/components/atoms/wc/` (e.g. `atom-stripe` in
`Stripe.ts`).

## Registration

Registered with the `ced` decorator from es-kit — imported from the narrow entry
point, not the root barrel:

```ts
import { ced } from '@e1011/es-kit/utils/ced'

@ced('atom-stripe')
class Stripe extends HTMLElement {
  static get observedAttributes() { return ['value'] }
  attributeChangedCallback(name: string, oldVal: string, newVal: string) { /* ... */ }
}

export default Stripe
```

This is why `experimentalDecorators` + `emitDecoratorMetadata` stay enabled in
`tsconfig.app.json`. (Decorators are *not* affected by `erasableSyntaxOnly`,
which only bans enums, namespaces and parameter properties.)

Shadow DOM styles are inlined by importing the SCSS with `?inline` and injecting
it into a `<template>`.

## React 19 JSX typing — module augmentation

React 19 moved `JSX.IntrinsicElements` out of the global scope and into the
`react` module. Register the tag with **module augmentation**, in the same file
as the component:

```ts
interface AtomStripeAttributes extends React.HTMLAttributes<HTMLElement> {
  value?: string | number
}

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'atom-stripe': AtomStripeAttributes
    }
  }
}
```

> `declare global { namespace JSX { … } }` is the **React 18** pattern and does
> not work here.

## Usage

Side-effect import the file to register the element, then use the tag:

```tsx
import '~/components/atoms/wc/Stripe'

<atom-stripe value={progress} style={{ width: '600px' }} />
```

**React 19 passes values as *properties*, not attributes**, to custom elements.
So reactive updates must be handled by a property setter (and/or
`attributeChangedCallback`) — `Stripe` implements a `value` setter that writes
directly to the shadow DOM.
