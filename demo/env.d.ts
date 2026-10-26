// Docs pages are Markdown files that build/vite-plugin-demo.ts compiles into
// Vue components
declare module '*.md' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent
  export default component
}
