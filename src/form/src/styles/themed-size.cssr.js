import { c, cB, cM, createKey } from '../../../_utils/cssr'
import { depx, pxfy } from '../../../_utils/css'

export default c([
  ({ props }) => {
    const size = props.$instance.mergedSize
    const $local = props.$local
    const blankHeight = $local[createKey('blankHeight', size)]
    const feedbackFontSize = $local[createKey('feedbackFontSize', size)]
    const labelFontSizeTop = $local[createKey('labelFontSizeTop', size)]
    const labelFontSizeLeft = $local[createKey('labelFontSizeLeft', size)]
    const labelHeight = $local[createKey('labelHeight', size)]
    return cB('form-item', [
      cM(size + '-size', [
        cM('top-labelled', [
          cM('no-label', {
            paddingTop: labelHeight
          }),
          cB('form-item-label', {
            fontSize: labelFontSizeTop,
            height: labelHeight
          })
        ]),
        cB('form-item-blank', {
          minHeight: pxfy(depx(blankHeight) + 6)
        }),
        cM('left-labelled', [
          cB('form-item-label', {
            fontSize: labelFontSizeLeft,
            height: pxfy(depx(blankHeight) + 6),
            lineHeight: pxfy(depx(blankHeight) + 6)
          })
        ]),
        cB('form-item-feedback-wrapper', {
          minHeight: $local[createKey('feedbackHeight', size)],
          fontSize: feedbackFontSize
        })
      ])
    ])
  }
])
