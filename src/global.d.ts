import { HTMLAttributes } from 'vue'
export {}

declare global {
  var __DEV__: boolean
}

// TODO: remove it, since it may conflict with user's d.ts
type ConflictKeys = 'title'

declare module 'vue' {
  interface ComponentCustomProps extends Omit<HTMLAttributes, ConflictKeys> {}
}
