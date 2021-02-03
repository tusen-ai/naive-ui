import { GlobalTheme } from '../config-provider'

type ComponentKey = keyof GlobalTheme
type ComponentThemes = Array<Exclude<GlobalTheme[ComponentKey], undefined>>

export function createTheme (componentThemes: ComponentThemes): GlobalTheme {
  const theme: GlobalTheme = {}
  for (const cTheme of componentThemes) {
    theme[cTheme.name] = cTheme as any
  }
  return theme
}
