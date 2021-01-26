import { defineComponent, h, inject, PropType } from 'vue'
import { NInput } from '../../input'
import { DynamicInputInjection } from './interface'

export default defineComponent({
  name: 'DynamicInputPairPreset',
  props: {
    value: {
      type: Object as PropType<{ key: string, value: string }>,
      default: () => ({
        key: '',
        value: ''
      })
    },
    parentPath: String,
    path: String,
    onUpdateValue: {
      type: Function as PropType<
      (data: { key: string, value: string }) => void
      >,
      required: true
    }
  },
  setup (props) {
    const NDynamicInput = inject<DynamicInputInjection>(
      'NDynamicInput'
    ) as DynamicInputInjection
    return {
      NDynamicInput,
      handleKeyInput (key: string) {
        props.onUpdateValue({
          key,
          value: props.value.value
        })
      },
      handleValueInput (value: string) {
        props.onUpdateValue({
          key: props.value.key,
          value
        })
      }
    }
  },
  render () {
    const { NDynamicInput, value } = this
    return (
      <div class="n-dynamic-input-preset-pair">
        <NInput
          unstableTheme={NDynamicInput.mergedTheme.peers.Input}
          unstableTheme-overrides={NDynamicInput.mergedTheme.overrides.Input}
          value={value.key}
          class="n-dynamic-input-pair-input"
          placeholder={NDynamicInput.keyPlaceholder}
          onUpdateValue={this.handleKeyInput}
        />
        <NInput
          unstableTheme={NDynamicInput.mergedTheme.peers.Input}
          unstableTheme-overrides={NDynamicInput.mergedTheme.overrides.Input}
          value={value.value}
          class="n-dynamic-input-pair-input"
          placeholder={NDynamicInput.valuePlaceholder}
          onUpdateValue={this.handleValueInput}
        />
      </div>
    )
  }
})
