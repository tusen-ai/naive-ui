import { useMemo } from 'vooks'
import { defineComponent, h, inject } from 'vue'
import { getTitleAttribute } from '../../_utils'
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
  setup(props) {
    const { source } = props
    const {
      mergedClsPrefixRef,
      mergedThemeRef,
      srcCheckedValuesRef,
      tgtCheckedValuesRef,
      handleSrcCheckboxClick,
      handleTgtCheckboxClick
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
  render() {
    const { disabled, mergedTheme, mergedClsPrefix, label, checked, source }
      = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-legacy-transfer-list-item`,
          disabled && `${mergedClsPrefix}-legacy-transfer-list-item--disabled`,
          source
            ? `${mergedClsPrefix}-legacy-transfer-list-item--source`
            : `${mergedClsPrefix}-legacy-transfer-list-item--target`
        ]}
        onClick={this.handleClick}
      >
        <div class={`${mergedClsPrefix}-legacy-transfer-list-item__checkbox`}>
          <NCheckbox
            theme={mergedTheme.peers.Checkbox}
            themeOverrides={mergedTheme.peerOverrides.Checkbox}
            disabled={disabled}
            checked={checked}
          />
        </div>
        <div
          class={`${mergedClsPrefix}-legacy-transfer-list-item__label`}
          title={getTitleAttribute(label)}
        >
          {label}
        </div>
      </div>
    )
  }
})
