import type { InjectionKey } from 'vue'

export function createInjectionKey<T>(key: string): InjectionKey<T> {
  return key as any
}
