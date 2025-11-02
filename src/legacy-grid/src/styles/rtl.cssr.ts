import { repeat } from 'seemly'
import { cB, cM } from '../../../_utils/cssr'

const positionStyles = repeat(24, null)
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
        right: percent,
        left: 'unset'
      }),
      cM(`${prefixIndex}-pull`, {
        left: percent,
        right: 'unset'
      })
    ]
  })

export default cB('row', [
  cM('rtl', `
    direction: rtl;
  `, [
    cB('col', positionStyles)
  ])
])
