import { CSSProperties, h, VNode } from 'vue'

export function renderDropMark ({
  position,
  level,
  indent
}: {
  position: 'top' | 'center' | 'bottom'
  level: number
  indent: number
}): VNode {
  const style: CSSProperties = {
    position: 'absolute',
    boxSizing: 'border-box',
    right: 0
  }
  if (position === 'center') {
    style.left = 0
    style.top = 0
    style.bottom = 0
    style.borderRadius = 'inherit'
    style.boxShadow = 'inset 0 0 0 1.5px var(--drop-mark-color)'
  } else {
    style[position] = 0
    style.left = `${level * indent + 40}px`
    style.height = '2px'
    style.backgroundColor = 'var(--drop-mark-color)'
    style.transformOrigin = position
    style.borderRadius = '1px'
    style.transform = 'scaleY(.75)'
  }
  return <div style={style} class="__tree-drop-mark"></div>
}
