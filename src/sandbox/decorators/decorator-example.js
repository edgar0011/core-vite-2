export const Dec = (...args) => {
  console.log('Dec Decorator Y', args)
  window.eventBusY = new args[0]()
  window.decoratorsWorkY = true
}

// TODO investigate why it works in TS but not in JS
// @Dec
export class EventBus2 {
  constructor() {
    // super()
  }
}
