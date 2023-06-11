import { h, defineComponent, inject, type PropType } from 'vue'
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
    onUpdateValue: {
      type: Function as PropType<(value: string | null) => void>,
      required: true
    }
  },
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { mergedThemeRef, mergedClsPrefixRef } = inject(transferInjectionKey)!
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef
    }
  },
  render () {
    const { mergedTheme, mergedClsPrefix } = this
    return (
      <div class={`${mergedClsPrefix}-transfer-filter`}>
        <NInput
          value={this.value}
          onUpdateValue={this.onUpdateValue}
          disabled={this.disabled}
          placeholder={this.placeholder}
          theme={mergedTheme.peers.Input}
          themeOverrides={mergedTheme.peerOverrides.Input}
          clearable
          size="small"
        >
          {{
            'clear-icon-placeholder': () => (
              <NBaseIcon clsPrefix={mergedClsPrefix}>
                {{ default: () => <SearchIcon /> }}
              </NBaseIcon>
            )
          }}
        </NInput>
      </div>
    )
  }
})
