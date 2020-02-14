class PopoverManager {
  constructor () {
    this.id2Content = new Map()
    this.id2Activator = new Map()
  }
  registerActivator (key, instance) {
    this.id2Activator.set(key, instance)
  }
  registerContent (key, instance) {
    this.id2Content.set(key, instance)
  }
  unregisterActivator (key) {
    this.id2Activator.delete(key)
  }
  unregisterContent (key) {
    this.id2Content.delete(key)
  }
  getContentInstance (key) {
    return this.id2Content.get(key) || null
  }
  getActivatorInstance (key) {
    return this.id2Activator.get(key) || null
  }
}

export default new PopoverManager()
