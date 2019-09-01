function abstractRegister (self, componentInstance, mapKey, reverseMapKey) {
  if (componentInstance && componentInstance.id) {
    const map = self[mapKey]
    const reverseMap = self[reverseMapKey]
    const id = componentInstance.id
    const memorizedId = reverseMap.get(componentInstance)
    if (map.has(id)) {
      map.delete(id)
    }
    if (map.has(memorizedId)) {
      map.delete(memorizedId)
    }
    map.set(id, componentInstance)
    reverseMap.set(componentInstance, id)
  }
}

function abstractUnregister (self, componentInstance, mapKey, reverseMapKey) {
  if (componentInstance && componentInstance.id) {
    const map = self[mapKey]
    const reverseMap = self[reverseMapKey]
    const id = componentInstance.id
    const memorizedId = reverseMap.get(componentInstance)
    if (map.has(id)) {
      map.delete(id)
    }
    if (map.has(memorizedId)) {
      map.delete(memorizedId)
    }
    map.delete(componentInstance)
  }
}

class PopoverManager {
  constructor () {
    this.id2activator = new Map()
    this.activator2id = new Map()
    this.id2content = new Map()
    this.content2id = new Map()
  }
  registerActivator (activator) {
    console.log(`[PopoverManager.registerActivator]`)
    abstractRegister(this, activator, 'id2activator', 'activator2id')
  }
  registerContent (content) {
    console.log(`[PopoverManager.registerContent]`)
    abstractRegister(this, content, 'id2content', 'content2id')
  }
  unregisterActivator (activator) {
    console.log(`[PopoverManager.unregisterActivator]`)
    abstractUnregister(this, activator, 'id2activator', 'activator2id')
  }
  unregisterContent (content) {
    console.log(`[PopoverManager.unregisterContent]`)
    abstractUnregister(this, content, 'id2content', 'content2id')
  }
  getContentInstance (activator) {
    return this.id2content.get(activator.id) || null
  }
  getActivatorInstance (content) {
    return this.id2activator.get(content.id) || null
  }
}

export default new PopoverManager()
