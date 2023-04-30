import { type GlobalTheme } from '../config-provider'

type ComponentKey = Exclude<keyof GlobalTheme, 'name'>
type ComponentThemes = Array<Exclude<GlobalTheme[ComponentKey], undefined>>

export function createTheme (
  name: string,
  componentThemes: ComponentThemes
): GlobalTheme
export function createTheme (componentThemes: ComponentThemes): GlobalTheme
export function createTheme (
  name: string | ComponentThemes,
  componentThemes?: ComponentThemes
): GlobalTheme {
  const nameIsString = typeof name === 'string'
  const theme: GlobalTheme = {
    name: nameIsString ? name : 'customized-theme'
  }
  if (nameIsString) {
    if (componentThemes) {
      for (const cTheme of componentThemes) {
        theme[cTheme.name] = cTheme as any
      }
    }
  } else {
    for (const cTheme of name) {
      theme[cTheme.name] = cTheme as any
    }
  }
  return theme
}
