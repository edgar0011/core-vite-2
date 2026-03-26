async function demo() {
  console.log('before await')
  await Promise.resolve()
  console.log('after await')
}

console.log('demo()', demo())
console.log('Outside')

export {}
