import { h, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FormItemFeedback',
  props: {
    explains: Array as PropType<string[]>,
    feedback: String
  },
  render () {
    const { feedback } = this
    return feedback ? (
      <div key={feedback} class="n-form-item-feedback__line">
        {feedback}
      </div>
    ) : (
      this.explains?.map((explain) => (
        <div key={explain} class="n-form-item-feedback__line">
          {explain}
        </div>
      ))
    )
  }
})
