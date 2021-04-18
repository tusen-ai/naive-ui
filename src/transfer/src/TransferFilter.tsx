import { h, defineComponent, inject, PropType } from 'vue'
import { SearchIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'
import { NInput } from '../../input'
import { transferInjectionKey } from './interface'

export default defineComponent({
  name: 'TransferFilter',
  props: {
    value: String,
    placeholder: String,
    disabled: Boolean,
    onFocus: {
      type: Function as PropType<() => void>,
      required: true
    },
    onBlur: {
      type: Function as PropType<() => void>,
      required: true
    },
    onUpdateValue: {
      type: Function as PropType<(value: string | null) => void>,
      required: true
    }
  },
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedThemeRef, cPrefixRef } = inject(transferInjectionKey)!
    return {
      cPrefix: cPrefixRef,
      mergedTheme: mergedThemeRef
    }
  },
  render () {
    const { mergedTheme, cPrefix } = this
    return (
      <div class={`${cPrefix}-transfer-filter`}>
        <NInput
          value={this.value}
          onUpdateValue={this.onUpdateValue}
          disabled={this.disabled}
          theme={mergedTheme.peers.Input}
          themeOverrides={mergedTheme.peerOverrides.Input}
          clearable
          size="small"
          placeholder={this.placeholder}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        >
          {{
            clear: () => (
              <NBaseIcon clsPrefix={cPrefix} class={`${cPrefix}-transfer-icon`}>
                {{ default: () => <SearchIcon /> }}
              </NBaseIcon>
            )
          }}
        </NInput>
      </div>
    )
  }
})
