import { CSSProperties, h, VNode } from 'vue'

export function renderDropMark (position: 'top' | 'center' | 'bottom'): VNode {
  const style: CSSProperties = {
    position: 'absolute',
    boxSizing: 'border-box',
    right: 0,
    left: 0
  }
  if (position === 'center') {
    style.top = 0
    style.bottom = 0
    style.borderRadius = 'inherit'
    style.border = '2px solid black'
  } else {
    style[position] = 0
    style.height = '2px'
    style.backgroundColor = 'black'
  }
  return <div style={style}></div>
}
