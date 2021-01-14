import { cB, cM } from '../../../_utils/cssr'

export default cB('affix', [
  cM('affixed', {
    position: 'fixed'
  }, [
    cM('absolute-positioned', {
      position: 'absolute'
    })
  ])
])
