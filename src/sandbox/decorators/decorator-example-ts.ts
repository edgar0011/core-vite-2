const Dec = (...args: unknown[]) => {
  console.log('Dec Decorator app utils', args)
}

@Dec
export class Example {
  constructor() {
    // super()
  }
}
