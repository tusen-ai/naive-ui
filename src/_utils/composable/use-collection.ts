import {
  watch,
  onMounted,
  inject,
  type Ref,
  getCurrentInstance,
  onBeforeUnmount,
  type InjectionKey
} from 'vue'

// injection.collection {
//   key1: [insta, instb]
//   key2: [instc]
// }
export function useInjectionInstanceCollection (
  injectionName: string | InjectionKey<unknown>,
  collectionKey: string,
  registerKeyRef: Ref<string | undefined>
): void {
  const injection = inject<Record<string, Record<string, any>> | null>(
    injectionName,
    null
  )
  if (injection === null) return
  const vm = getCurrentInstance()?.proxy
  watch(registerKeyRef, registerInstance)
  registerInstance(registerKeyRef.value)
  onBeforeUnmount(() => {
    registerInstance(undefined, registerKeyRef.value)
  })
  function registerInstance (key?: string, oldKey?: string): void {
    if (!injection) return
    const collection = injection[collectionKey]
    if (oldKey !== undefined) removeInstance(collection, oldKey)
    if (key !== undefined) addInstance(collection, key)
  }
  function removeInstance (
    collection: Record<string, any[]>,
    key: string
  ): void {
    if (!collection[key]) collection[key] = []
    collection[key].splice(
      collection[key].findIndex((instance) => instance === vm),
      1
    )
  }
  function addInstance (collection: Record<string, any[]>, key: string): void {
    if (!collection[key]) collection[key] = []
    if (!~collection[key].findIndex((instance) => instance === vm)) {
      collection[key].push(vm)
    }
  }
}

// injection.collection {
//   key1: [insta.value, instb.value]
//   key2: [instc.value]
// }
export function useInjectionCollection (
  injectionName: string | InjectionKey<unknown>,
  collectionKey: string,
  valueRef: Ref<any>
): void {
  const injection = inject<Record<any, any[]> | null>(injectionName, null)
  if (injection === null) return
  if (!(collectionKey in injection)) {
    injection[collectionKey] = []
  }
  injection[collectionKey].push(valueRef.value)
  watch(valueRef, (value, prevValue) => {
    const collectionArray = injection[collectionKey]
    const index = collectionArray.findIndex(
      (collectionValue) => collectionValue === prevValue
    )
    if (~index) collectionArray.splice(index, 1)
    collectionArray.push(value)
  })
  onBeforeUnmount(() => {
    const collectionArray = injection[collectionKey]
    const index = collectionArray.findIndex(
      (collectionValue) => collectionValue === valueRef.value
    )
    if (~index) collectionArray.splice(index, 1)
  })
}

// injection.collection {
//   key1: [insta.$el, instb.$el]
//   key2: [instc.$el]
// }
export function useInjectionElementCollection (
  injectionName: string | InjectionKey<unknown>,
  collectionKey: string,
  getElement: () => HTMLElement | null
): void {
  const injection = inject<Record<string, HTMLElement[]> | null>(
    injectionName,
    null
  )
  if (injection === null) return
  if (!(collectionKey in injection)) {
    injection[collectionKey] = []
  }
  onMounted(() => {
    const el = getElement()
    if (!el) return
    injection[collectionKey].push(el)
  })
  onBeforeUnmount(() => {
    const collectionArray = injection[collectionKey]
    const element = getElement()
    const index = collectionArray.findIndex(
      (collectionElement) => collectionElement === element
    )
    if (~index) collectionArray.splice(index, 1)
  })
}
