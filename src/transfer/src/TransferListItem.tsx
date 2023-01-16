import { h, inject, defineComponent, PropType } from 'vue'
import { useMemo } from 'vooks'
import { NCheckbox } from '../../checkbox'
import { getTitleAttribute } from '../../_utils'
import { NBaseClose } from '../../_internal'
import { transferInjectionKey, Option } from './interface'

export default defineComponent({
  name: 'NTransferListItem',
  props: {
    source: Boolean,
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    disabled: Boolean,
    option: {
      type: Object as PropType<Option>,
      required: true
    }
  },
  setup (props) {
    const {
      targetValueSetRef,
      mergedClsPrefixRef,
      mergedThemeRef,
      handleItemCheck,
      renderSourceLabelRef,
      renderTargetLabelRef,
      showSelectedRef
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(transferInjectionKey)!
    const checkedRef = useMemo(() => targetValueSetRef.value.has(props.value))
    function handleClick (): void {
      if (!props.disabled) {
        handleItemCheck(!checkedRef.value, props.value)
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef,
      checked: checkedRef,
      showSelected: showSelectedRef,
      renderSourceLabel: renderSourceLabelRef,
      renderTargetLabel: renderTargetLabelRef,
      handleClick
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
      renderSourceLabel,
      renderTargetLabel
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
        onClick={source ? this.handleClick : undefined}
      >
        <div class={`${mergedClsPrefix}-transfer-list-item__background`} />
        {source && this.showSelected && (
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
          {source
            ? renderSourceLabel
              ? renderSourceLabel({
                option: this.option
              })
              : label
            : renderTargetLabel
              ? renderTargetLabel({
                option: this.option
              })
              : label}
        </div>
        {!source && !disabled && (
          <NBaseClose
            focusable={false}
            class={`${mergedClsPrefix}-transfer-list-item__close`}
            clsPrefix={mergedClsPrefix}
            onClick={this.handleClick}
          />
        )}
      </div>
    )
  }
})
