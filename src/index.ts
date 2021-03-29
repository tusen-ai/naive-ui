export { default } from './preset'

export { useOsTheme } from 'vooks'

export { default as create } from './create'

export * from './locales'
export * from './components'

// component themes
export * from './styles'
// composed global theme, createTheme from component themes util
export { darkTheme, createTheme } from './themes'

export { c, cE, cM, cB, cNotM } from './_utils/cssr'

export { default as version } from './version'
