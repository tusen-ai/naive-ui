import { h, inject, defineComponent } from 'vue'
import { useMemo } from 'vooks'
import { NCheckbox } from '../../checkbox'
import { transferInjectionKey } from './interface'

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NTransfer = inject(transferInjectionKey)!
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
      handleClick
    }
  },
  render () {
    const { disabled, NTransfer, label, checked, source } = this
    const { mergedTheme, cPrefix } = NTransfer
    return (
      <div
        class={[
          `${cPrefix}-transfer-list-item`,
          disabled && `${cPrefix}-transfer-list-item--disabled`,
          source
            ? `${cPrefix}-transfer-list-item--source`
            : `${cPrefix}-transfer-list-item--target`
        ]}
        onClick={this.handleClick}
      >
        <div class={`${cPrefix}-transfer-list-item__checkbox`}>
          <NCheckbox
            theme={mergedTheme.peers.Checkbox}
            themeOverrides={mergedTheme.peerOverrides.Checkbox}
            disabled={disabled}
            checked={checked}
          />
        </div>
        <div class={`${cPrefix}-transfer-list-item__label`}>{label}</div>
      </div>
    )
  }
})
