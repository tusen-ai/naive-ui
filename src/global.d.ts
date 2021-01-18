import { HTMLAttributes } from 'vue'
export {}

declare global {
  var __DEV__: boolean
}

declare module 'vue' {
  interface ComponentCustomProps extends HTMLAttributes {}
}
