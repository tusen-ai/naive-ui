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
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      srcCheckedValuesRef,
      tgtCheckedValuesRef,
      handleSrcCheckboxClick,
      handleTgtCheckboxClick
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(transferInjectionKey)!
    const checkedRef = source
      ? useMemo(() => srcCheckedValuesRef.value.includes(props.value))
      : useMemo(() => tgtCheckedValuesRef.value.includes(props.value))
    const handleClick = source
      ? () => {
          if (!props.disabled) {
            handleSrcCheckboxClick(!checkedRef.value, props.value)
          }
        }
      : () => {
          if (!props.disabled) {
            handleTgtCheckboxClick(!checkedRef.value, props.value)
          }
        }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      checked: checkedRef,
      handleClick
    }
  },
  render () {
    const { disabled, mergedTheme, mergedClsPrefix, label, checked, source } =
      this
    return (
      <div
        class={[
          `${mergedClsPrefix}-transfer-list-item`,
          disabled && `${mergedClsPrefix}-transfer-list-item--disabled`,
          source
            ? `${mergedClsPrefix}-transfer-list-item--source`
            : `${mergedClsPrefix}-transfer-list-item--target`
        ]}
        onClick={this.handleClick}
      >
        <div class={`${mergedClsPrefix}-transfer-list-item__checkbox`}>
          <NCheckbox
            theme={mergedTheme.peers.Checkbox}
            themeOverrides={mergedTheme.peerOverrides.Checkbox}
            disabled={disabled}
            checked={checked}
          />
        </div>
        <div class={`${mergedClsPrefix}-transfer-list-item__label`}>
          {label}
        </div>
      </div>
    )
  }
})
