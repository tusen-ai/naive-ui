import { h, inject, defineComponent } from 'vue'
import { useMemo } from 'vooks'
import { NCheckbox } from '../../checkbox'
import type { TransferInjection } from './interface'

export default defineComponent({
  name: 'NTransferListItem',
  props: {
    source: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { source } = props
    const NTransfer = inject<TransferInjection>(
      'NTransfer'
    ) as TransferInjection
    const checkedRef = source
      ? useMemo(() => NTransfer.srcCheckedValues.includes(props.value))
      : useMemo(() => NTransfer.tgtCheckedValues.includes(props.value))
    const handleClick = source
      ? () => {
        if (!props.disabled) {
          NTransfer.handleSrcCheckboxClick(!checkedRef.value, props.value)
        }
      }
      : () => {
        if (!props.disabled) {
          NTransfer.handleTgtCheckboxClick(!checkedRef.value, props.value)
        }
      }
    return {
      NTransfer,
      checked: checkedRef,
      className: source
        ? 'n-transfer-list-item--source'
        : 'n-transfer-list-item--target',
      handleClick
    }
  },
  render () {
    const { disabled, NTransfer, label, checked, className } = this
    return (
      <div
        class={[
          'n-transfer-list-item',
          className,
          {
            'n-transfer-list-item--disabled': disabled
          }
        ]}
        onClick={this.handleClick}
      >
        <div class="n-transfer-list-item__checkbox">
          <NCheckbox
            theme={NTransfer.mergedTheme.peers.Checkbox}
            themeOverrides={NTransfer.mergedTheme.peerOverrides.Checkbox}
            disabled={disabled}
            checked={checked}
          />
        </div>
        <div class="n-transfer-list-item__label">{label}</div>
      </div>
    )
  }
})
