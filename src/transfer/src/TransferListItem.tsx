import { h, inject, defineComponent } from 'vue'
import { useMemo } from 'vooks'
import { NCheckbox } from '../../checkbox'
import { transferInjectionKey } from './interface'
import { getTitleAttribute } from '../../_utils'

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
    const {
      tgtValueSetRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      handleSrcCheckboxClick
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(transferInjectionKey)!
    const checkedRef = useMemo(() => tgtValueSetRef.value.has(props.value))
    const handleClick = (): void => {
      if (!props.disabled) {
        handleSrcCheckboxClick(!checkedRef.value, props.value)
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
        {source && (
          <div class={`${mergedClsPrefix}-transfer-list-item__checkbox`}>
            <NCheckbox
              theme={mergedTheme.peers.Checkbox}
              themeOverrides={mergedTheme.peerOverrides.Checkbox}
              disabled={disabled}
              checked={checked}
            />
          </div>
        )}
        <div
          class={`${mergedClsPrefix}-transfer-list-item__label`}
          title={getTitleAttribute(label)}
        >
          {label}
        </div>
      </div>
    )
  }
})
