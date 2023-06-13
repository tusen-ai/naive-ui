export { default, install } from './preset'

export { useOsTheme } from 'vooks'

export { zindexable } from 'vdirs'

export { default as create } from './create'

export * from './locales'
export * from './components'
export * from './composables'

// component themes
export * from './styles'
// composed global theme, createTheme from component themes util
export { darkTheme, lightTheme, createTheme } from './themes'

export { c, cE, cM, cB, cNotM } from './_utils/cssr'

export { default as version } from './version'

export { NThemeEditor } from './theme-editor'
