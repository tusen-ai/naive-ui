import { h, inject, defineComponent, ref, PropType } from 'vue'
import { useMemo } from 'vooks'
import { NCheckbox } from '../../checkbox'
import { transferInjectionKey, Option } from './interface'
import { getTitleAttribute } from '../../_utils'
import { NBaseClose } from '../../_internal'

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
    },
    option: {
      type: Object as PropType<Option>,
      required: true
    }
  },
  setup (props) {
    const {
      tgtValueSetRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      handleItemCheck,
      renderLabel
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(transferInjectionKey)!
    const checkedRef = useMemo(() => tgtValueSetRef.value.has(props.value))
    const hasItemHoverRef = ref(false)
    function handleClick (): void {
      if (!props.disabled) {
        handleItemCheck(!checkedRef.value, props.value)
      }
    }
    function handleMouseEnter (): void {
      hasItemHoverRef.value = true
    }
    function handleMouseLeave (): void {
      hasItemHoverRef.value = false
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      checked: checkedRef,
      hasItemHover: hasItemHoverRef,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      renderLabel
    }
  },
  render () {
    const {
      disabled,
      mergedTheme,
      mergedClsPrefix,
      label,
      checked,
      source,
      renderLabel
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-transfer-list-item`,
          disabled && `${mergedClsPrefix}-transfer-list-item--disabled`,
          source
            ? `${mergedClsPrefix}-transfer-list-item--source`
            : `${mergedClsPrefix}-transfer-list-item--target`
        ]}
        onClick={() => (source ? this.handleClick() : null)}
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
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
          {renderLabel
            ? renderLabel({
              from: source ? 'source' : 'target',
              option: this.option
            })
            : label}
        </div>
        {!source && this.hasItemHover && !disabled && (
          <div class={`${mergedClsPrefix}-transfer-list-item__close`}>
            <NBaseClose
              clsPrefix={mergedClsPrefix}
              onClick={this.handleClick}
            />
          </div>
        )}
      </div>
    )
  }
})
