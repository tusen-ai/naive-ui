import { h, defineComponent, inject, Slots, renderSlot } from 'vue'
import { useConfig } from '../../../_mixins'
export default defineComponent({
  name: 'DatePanelFooter',
  setup () {
    const datePickerSlots = inject('datePickerSlot') as Slots
    const { mergedClsPrefixRef } = useConfig()
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      datePickerSlots
    }
  },
  render () {
    const { mergedClsPrefix, datePickerSlots } = this
    return datePickerSlots.footer ? (
      <div class={`${mergedClsPrefix}-date-panel-extra-footer`}>
        {renderSlot(datePickerSlots, 'footer')}
      </div>
    ) : null
  }
})
