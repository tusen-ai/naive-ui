import { defineComponent, h, inject, PropType } from 'vue'
import { NInput } from '../../input'
import { dynamicInputInjectionKey } from './interface'

export default defineComponent({
  name: 'DynamicInputPairPreset',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDynamicInput = inject(dynamicInputInjectionKey)!
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
    const { NDynamicInput, value, clsPrefix } = this
    return (
      <div class={`${clsPrefix}-dynamic-input-preset-pair`}>
        <NInput
          theme={NDynamicInput.mergedTheme.peers.Input}
          theme-overrides={NDynamicInput.mergedTheme.peerOverrides.Input}
          value={value.key}
          class={`${clsPrefix}-dynamic-input-pair-input`}
          placeholder={NDynamicInput.keyPlaceholder}
          onUpdateValue={this.handleKeyInput}
        />
        <NInput
          theme={NDynamicInput.mergedTheme.peers.Input}
          theme-overrides={NDynamicInput.mergedTheme.peerOverrides.Input}
          value={value.value}
          class={`${clsPrefix}-dynamic-input-pair-input`}
          placeholder={NDynamicInput.valuePlaceholder}
          onUpdateValue={this.handleValueInput}
        />
      </div>
    )
  }
})
