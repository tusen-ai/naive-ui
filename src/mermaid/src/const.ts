interface MermaidThemeItem {
  background?: string
  displayName: string
  id: string
}

export const mermaidThemes: MermaidThemeItem[] = [
  {
    background: '#fbf9ff',
    displayName: 'Mermaid Default',
    id: 'default'
  },
  {
    background: '#fffcf8',
    displayName: 'Mermaid Base',
    id: 'base'
  },
  {
    background: '#000',
    displayName: 'Mermaid Dark',
    id: 'dark'
  },
  {
    background: '#f9ffeb',
    displayName: 'Mermaid Forest',
    id: 'forest'
  },
  {
    background: '#fff',
    displayName: 'Mermaid Neutral',
    id: 'neutral'
  }
]
