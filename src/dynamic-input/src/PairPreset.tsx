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
    disabled: Boolean,
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
    const { mergedThemeRef, keyPlaceholderRef, valuePlaceholderRef } = inject(
      dynamicInputInjectionKey
    )!
    return {
      mergedTheme: mergedThemeRef,
      keyPlaceholder: keyPlaceholderRef,
      valuePlaceholder: valuePlaceholderRef,
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
    const {
      mergedTheme,
      keyPlaceholder,
      valuePlaceholder,
      value,
      clsPrefix,
      disabled
    } = this
    return (
      <div class={`${clsPrefix}-dynamic-input-preset-pair`}>
        <NInput
          theme={mergedTheme.peers.Input}
          theme-overrides={mergedTheme.peerOverrides.Input}
          value={value.key}
          class={`${clsPrefix}-dynamic-input-pair-input`}
          placeholder={keyPlaceholder}
          onUpdateValue={this.handleKeyInput}
          disabled={disabled}
        />
        <NInput
          theme={mergedTheme.peers.Input}
          theme-overrides={mergedTheme.peerOverrides.Input}
          value={value.value}
          class={`${clsPrefix}-dynamic-input-pair-input`}
          placeholder={valuePlaceholder}
          onUpdateValue={this.handleValueInput}
          disabled={disabled}
        />
      </div>
    )
  }
})
