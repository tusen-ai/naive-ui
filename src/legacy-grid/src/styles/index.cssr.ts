import { c, cB, cM, cE } from '../../../_utils/cssr'

const positionStyles = Array
  .apply(null, { length: 24 } as any)
  .map((_, index) => {
    const prefixIndex = index + 1
    const percent = `calc(100% / 24 * ${prefixIndex})`
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

export default c([
  cB('row', {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  }),
  cB('col', {
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
])
