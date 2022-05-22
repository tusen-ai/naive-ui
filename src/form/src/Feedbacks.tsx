import { h, defineComponent, PropType, inject, VNode } from 'vue'
import { formItemRenderFeedbackInjectionKey } from './context'

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
    const { $slots, feedback, clsPrefix } = this
    if ($slots.default) {
      return $slots.default()
    }
    const renderFeedback = inject(formItemRenderFeedbackInjectionKey)
    const getRenderedFeedback = (
      raw: string | undefined
    ): string | VNode | undefined =>
      renderFeedback ? renderFeedback(raw) : raw
    return feedback ? (
      <div key={feedback} class={`${clsPrefix}-form-item-feedback__line`}>
        {getRenderedFeedback(feedback)}
      </div>
    ) : (
      this.explains?.map((explain) => (
        <div key={explain} class={`${clsPrefix}-form-item-feedback__line`}>
          {getRenderedFeedback(explain)}
        </div>
      ))
    )
  }
})
