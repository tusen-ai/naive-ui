export const heatmapColorThemes = {
  github: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
  green: ['#f0f0f0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'],
  blue: ['#ebedf0', '#c0e7ff', '#73b3ff', '#0969da', '#0550ae'],
  orange: ['#ebedf0', '#fed7aa', '#fb923c', '#ea580c', '#c2410c'],
  purple: ['#ebedf0', '#e9d5ff', '#c084fc', '#9333ea', '#7c3aed'],
  red: ['#ebedf0', '#fecaca', '#f87171', '#dc2626', '#b91c1c']
}

export type HeatmapColorTheme = keyof typeof heatmapColorThemes
