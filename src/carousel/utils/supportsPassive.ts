let supportsPassive = false
try {
  const opts = Object.defineProperty({}, 'passive', {
    get () {
      supportsPassive = true
    }
  })
  // @ts-expect-error
  window.addEventListener('testPassiveListener', null, opts)
} catch (e) {}

export default supportsPassive
