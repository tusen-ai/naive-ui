<script>
import DeprecatedModal from './DeprecatedModal'
import Modal from './Modal'

export default {
  name: 'NModal',
  functional: true,
  render (h, context) {
    if (context.scopedSlots.activator) {
      return h(DeprecatedModal, {
        props: context.props,
        scopedSlots: context.scopedSlots,
        on: context.listeners
      })
    } else {
      return h(Modal, {
        props: context.props,
        scopedSlots: context.scopedSlots,
        slots: context.slots,
        on: context.listeners
      })
    }
  }
}
</script>
