import { ced } from '@e1011/es-kit'

import styles from './Stripe.scss?inline'

const template = document.createElement('template')

template.innerHTML = `
  <style>
    ${typeof styles === 'string' ? styles : ''}
  </style>
  <div class='stripe'>
    <span id='stripe'></span>
  </div>
`

@ced('atom-stripe')
class Stripe extends HTMLElement {
  #_value: string | number = 0

  get value(): string | number {
    return this.#_value
  }

  set value(val: string | number) {
    this.#_value = val
    const spanElement = this.shadowRoot?.querySelector('#stripe') as HTMLElement

    if (spanElement) {
      spanElement.style.width = `${val}%`
    }
  }

  static get observedAttributes() {
    return ['value']
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot?.appendChild(template.content.cloneNode(true))
  }

  connectedCallback() {
    document.addEventListener('click', this.domClickHandler)
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.domClickHandler)
  }

  attributeChangedCallback(attrName: string, oldVal: string | number, newVal: string | number) {
    console.log('attributeChangedCallback', attrName, oldVal, newVal)
    switch (attrName) {
      case 'value': {
        this.value = newVal
        break
      }
      default: {
        console.log('unhandled attribute change', attrName, oldVal, newVal)
        break
      }
    }

    console.log('this.method1', this.method1)
    this.method1()
    console.log('this.method2', this.method2)
    this.method2()

    console.log('this.message', this.message)

    console.log('this.message ?? ok', this.message ?? 'ok')
    console.log('2 ** 3', 2 ** 3)
  }

  message = 'Stripe message'

  method1 = () => {
    console.log('method1', this)
    console.log('method1, this.shadowRoot', this.shadowRoot)
    console.log('method1, this.value', this.value)
  }

  method2() {
    console.log('method2', this)
    console.log('method2, this.shadowRoot', this.shadowRoot)
    console.log('method2, this.value', this.value)
  }

  domClickHandler = (event: MouseEvent): void => {
    console.log('domClickHandler', this)
    console.log('domClickHandler, this.shadowRoot', this.shadowRoot)
    console.log('domClickHandler, event', event)
  }
}

export default Stripe

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'atom-stripe': Stripe
    }
  }
}
