export const heatmapColorThemes = {
  green: ['#c6e48b', '#7bc96f', '#239a3b', '#196127'],
  blue: ['#c0e7ff', '#73b3ff', '#0969da', '#0550ae'],
  orange: ['#fed7aa', '#fb923c', '#ea580c', '#c2410c'],
  purple: ['#e9d5ff', '#c084fc', '#9333ea', '#7c3aed'],
  red: ['#fecaca', '#f87171', '#dc2626', '#b91c1c']
}

export type HeatmapColorTheme = keyof typeof heatmapColorThemes
