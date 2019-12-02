<script>
import {
  getComponentNameOf,
  getOptionPropsDataOf
} from '../../../utils/component'

import {
  VALID_COMPONENT
} from './config'

export default {
  name: 'NSelectRenderOptions',
  functional: true,
  render (h, context) {
    const defaultSlot = context.scopedSlots.default()
    const filteredDefaultSlot = defaultSlot
      .filter(vNode => {
        if (VALID_COMPONENT.includes(getComponentNameOf(vNode))) {
          if (vNode.componentOptions) {
            const filter = context.props.filter
            const filterable = context.props.filterable
            const remote = context.props.remote
            if (!remote && filterable && filter) {
              const pattern = context.props.pattern
              const option = getOptionPropsDataOf(vNode)
              return filter(pattern, option)
            }
            return true
          }
          return true
        }
        return true
      })
    return filteredDefaultSlot
  }
}
</script>
