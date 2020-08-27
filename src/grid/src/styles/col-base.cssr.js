import { c, cB, cE, cM } from '../../../_utils/cssr'

export default c([
  ({ props }) => {
    const modifierItems = Array.apply(null, { length: 24 }).map((_, index) => {
      const _index = index + 1
      const percent = (1 / 24 * _index * 100).toFixed(2) + '%'
      return [
        cM(`${_index}-span`, {
          width: percent
        }),
        cM(`${_index}-offset`, {
          marginLeft: percent
        }),
        cM(`${_index}-push`, {
          left: percent
        }),
        cM(`${_index}-pull`, {
          right: percent
        })
      ]
    })
    return cB('col', {
      verticalAlign: 'top',
      boxSizing: 'border-box',
      display: 'inline-block',
      position: 'relative',
      zIndex: 'auto'
    }, [
      cE('box', {
        position: 'relative',
        zIndex: 'auto',
        width: '100%',
        height: '100%'
      }),
      ...modifierItems
    ])
  }
])
