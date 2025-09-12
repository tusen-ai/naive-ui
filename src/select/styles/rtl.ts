import type { RtlItem } from '../../config-provider/src/internal-interface'
import { scrollbarRtl } from '../../_internal/scrollbar/styles'
import { internalSelectMenuRtl } from '../../_internal/select-menu/styles'
import { internalSelectionRtl } from '../../_internal/selection/styles'
import { c } from '../../_utils/cssr'
import { tagRtl } from '../../tag/styles'

export const selectRtl: RtlItem = {
  name: 'Select',
  style: c([]),
  peers: [internalSelectionRtl, internalSelectMenuRtl, tagRtl, scrollbarRtl]
}
