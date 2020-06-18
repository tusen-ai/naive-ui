export default new Proxy({}, {
  get () {
    return 'rgb(0, 0, 0)'
  }
})
