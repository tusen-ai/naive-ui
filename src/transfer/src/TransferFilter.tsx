import { h, defineComponent, inject, PropType } from 'vue'
import { SearchIcon } from '../../_internal/icons'
import { NBaseIcon } from '../../_internal'
import { NInput } from '../../input'
import { TransferInjection } from './interface'

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
    const NTransfer = inject<TransferInjection>(
      'NTransfer'
    ) as TransferInjection
    return {
      NTransfer
    }
  },
  render () {
    const { NTransfer } = this
    return (
      <div class="n-transfer-filter">
        <NInput
          value={this.value}
          onUpdateValue={this.onUpdateValue}
          disabled={this.disabled}
          theme={NTransfer.mergedTheme.peers.Input}
          themeOverrides={NTransfer.mergedTheme.peerOverrides.Input}
          clearable
          size="small"
          placeholder={this.placeholder}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        >
          {{
            clear: () => (
              <NBaseIcon class="n-transfer-icon">
                {{ default: () => <SearchIcon /> }}
              </NBaseIcon>
            )
          }}
        </NInput>
      </div>
    )
  }
})
