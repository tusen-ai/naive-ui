import { c, cB, cM } from '../../../_utils/cssr'

export default c([
  () => {
    return cB(
      'affix',
      [
        cM('affixed', {
          position: 'fixed'
        }, [
          cM('absolute-positioned', {
            position: 'absolute'
          })
        ])
      ]
    )
  }
])
