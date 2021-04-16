import { h, defineComponent, inject, PropType } from 'vue'
import { NInput } from '../../input'
import { dynamicInputInjectionKey } from './interface'

export default defineComponent({
  name: 'DynamicInputInputPreset',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    parentPath: String,
    path: String,
    // eslint-disable-next-line vue/prop-name-casing
    onUpdateValue: {
      type: Function as PropType<(value: string) => void>,
      required: true
    }
  },
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NDynamicInput = inject(dynamicInputInjectionKey)!
    return {
      NDynamicInput
    }
  },
  render () {
    const { NDynamicInput, value, clsPrefix, onUpdateValue } = this
    return (
      <div class={`${clsPrefix}-dynamic-input-preset-input`}>
        <NInput
          theme={NDynamicInput.mergedTheme.peers.Input}
          theme-overrides={NDynamicInput.mergedTheme.peerOverrides.Input}
          value={value}
          placeholder={NDynamicInput.placeholder}
          onUpdateValue={onUpdateValue}
        />
      </div>
    )
  }
})
