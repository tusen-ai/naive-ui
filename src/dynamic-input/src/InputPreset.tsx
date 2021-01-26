import { h, defineComponent, inject, PropType } from 'vue'
import { NInput } from '../../input'
import { DynamicInputInjection } from './interface'

export default defineComponent({
  name: 'DynamicInputInputPreset',
  props: {
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
    const NDynamicInput = inject<DynamicInputInjection>(
      'NDynamicInput'
    ) as DynamicInputInjection
    return {
      NDynamicInput
    }
  },
  render () {
    const { NDynamicInput, value, onUpdateValue } = this
    return (
      <div class="n-dynamic-input-preset-input">
        <NInput
          unstableTheme={NDynamicInput.mergedTheme.peers.Input}
          unstableTheme-overrides={NDynamicInput.mergedTheme.overrides.Input}
          value={value}
          placeholder={NDynamicInput.placeholder}
          onUpdateValue={onUpdateValue}
        />
      </div>
    )
  }
})
