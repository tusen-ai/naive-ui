export function color2Class (color: string): string {
  return color.replace(/#|\(|\)|,|\s|\./g, '_')
}
