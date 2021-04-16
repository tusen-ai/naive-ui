import { h, defineComponent, PropType } from 'vue'

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
    const { feedback, clsPrefix } = this
    return feedback ? (
      <div key={feedback} class={`${clsPrefix}-form-item-feedback__line`}>
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
