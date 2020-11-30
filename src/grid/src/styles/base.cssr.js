import { c, cB, cM, cE } from '../../../_utils/cssr'

export default c([
  () => {
    return cB('row', {
      width: '100%'
    },
    [
      cM('flex', {
        display: 'flex'
      })
    ])
  },
  () => {
    const positionStyles = Array
      .apply(null, { length: 24 })
      .map((_, index) => {
        const prefixIndex = index + 1
        const percent = (1 / 24 * prefixIndex * 100).toFixed(2) + '%'
        return [
          cM(`${prefixIndex}-span`, {
            width: percent
          }),
          cM(`${prefixIndex}-offset`, {
            marginLeft: percent
          }),
          cM(`${prefixIndex}-push`, {
            left: percent
          }),
          cM(`${prefixIndex}-pull`, {
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
      positionStyles
    ])
  }
])
