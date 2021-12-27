import { h, defineComponent, PropType, renderSlot } from 'vue'

export default defineComponent({
  name: 'FormItemFeedback',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    explains: Array as PropType<string[]>,
    feedback: String
  },
  render () {
    const { feedback, clsPrefix, $slots } = this
    return feedback ? (
      <div key={feedback} class={`${clsPrefix}-form-item-feedback__line`}>
        {$slots.prefix ? renderSlot($slots, 'prefix') : null}
        {feedback}
      </div>
    ) : (
      this.explains?.map((explain) => (
        <div key={explain} class={`${clsPrefix}-form-item-feedback__line`}>
          {explain}
        </div>
      ))
    )
  }
})
