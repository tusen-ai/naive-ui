import {
  computed,
  defineComponent,
  h,
  provide,
  PropType,
  CSSProperties
} from 'vue'
import { useIsMounted } from 'vooks'
import { depx } from 'seemly'
import { useFormItem, useTheme, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils/cssr'
import { warn, call, ExtractPublicPropTypes } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { transferLight } from '../styles'
import type { TransferTheme } from '../styles'
import NTransferHeader from './TransferHeader'
import NTransferList from './TransferList'
import NTransferFilter from './TransferFilter'
import { useTransferData } from './use-transfer-data'
import style from './styles/index.cssr'
import {
  OptionValue,
  Option,
  Filter,
  OnUpdateValue,
  transferInjectionKey
} from './interface'

const transferProps = {
  ...(useTheme.props as ThemeProps<TransferTheme>),
  value: Array as PropType<OptionValue[] | null>,
  defaultValue: {
    type: Array as PropType<OptionValue[] | null>,
    default: null
  },
  options: {
    type: Array as PropType<Option[]>,
    default: () => []
  },
  disabled: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined
  },
  virtualScroll: Boolean,
  sourceTitle: String,
  targetTitle: String,
  filterable: Boolean,
  sourceFilterPlaceholder: String,
  targetFilterPlaceholder: String,
  filter: {
    type: Function as PropType<Filter>,
    default: (pattern: string, option: Option) => {
      if (!pattern) return true
      return ~('' + option.label)
        .toLowerCase()
        .indexOf(('' + pattern).toLowerCase())
    }
  },
  size: String as PropType<'small' | 'medium' | 'large'>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onChange: {
    type: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
    validator: () => {
      if (__DEV__) {
        warn(
          'transfer',
          '`on-change` is deprecated, please use `on-update:value` instead.'
        )
      }
      return true
    },
    default: undefined
  }
} as const

export type TransferProps = ExtractPublicPropTypes<typeof transferProps>

export default defineComponent({
  name: 'Transfer',
  props: transferProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Transfer',
      '-transfer',
      style,
      transferLight,
      props,
      mergedClsPrefixRef
    )
    const formItem = useFormItem(props)
    const { mergedSizeRef, mergedDisabledRef } = formItem
    const itemSizeRef = computed(() => {
      const { value: size } = mergedSizeRef
      const {
        self: { [createKey('itemHeight', size)]: itemSize }
      } = themeRef.value
      return depx(itemSize)
    })
    const {
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      tgtValueSet: tgtValueSetRef,
      avlSrcValueSet: avlSrcValueSetRef,
      tgtOpts: tgtOptsRef,
      srcOpts: srcOptsRef,
      filteredSrcOpts: filteredSrcOptsRef,
      srcCheckedStatus: srcCheckedStatusRef,
      srcPattern: srcPatternRef,
      isInputing: isInputingRef,
      handleInputFocus,
      handleInputBlur,
      handleSrcFilterUpdateValue
    } = useTransferData(props, mergedDisabledRef)
    function doUpdateValue (value: OptionValue[]): void {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue,
        onChange
      } = props
      const { nTriggerFormInput, nTriggerFormChange } = formItem
      if (onUpdateValue) call(onUpdateValue, value)
      if (_onUpdateValue) call(_onUpdateValue, value)
      if (onChange) call(onChange, value)
      uncontrolledValueRef.value = value
      nTriggerFormInput()
      nTriggerFormChange()
    }
    function handleSrcHeaderCheck (): void {
      const {
        value: { checked, indeterminate }
      } = srcCheckedStatusRef
      if (checked || indeterminate) {
        doUpdateValue([])
      } else {
        doUpdateValue([...avlSrcValueSetRef.value])
      }
    }
    function handleSrcCheckboxClick (
      checked: boolean,
      optionValue: OptionValue
    ): void {
      if (checked) {
        doUpdateValue([...(mergedValueRef.value || []), optionValue])
      } else {
        const index = (mergedValueRef.value || []).findIndex(
          (v) => v === optionValue
        )
        if (~index) {
          ;(mergedValueRef.value || []).splice(index, 1)
        }
      }
    }
    provide(transferInjectionKey, {
      tgtValueSetRef,
      mergedClsPrefixRef,
      disabledRef: mergedDisabledRef,
      mergedThemeRef: themeRef,
      srcOptsRef,
      tgtOptsRef,
      srcCheckedStatusRef,
      handleSrcCheckboxClick
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      itemSize: itemSizeRef,
      isMounted: useIsMounted(),
      isInputing: isInputingRef,
      mergedTheme: themeRef,
      filteredSrcOpts: filteredSrcOptsRef,
      tgtOpts: tgtOptsRef,
      srcPattern: srcPatternRef,
      handleSrcHeaderCheck,
      handleInputFocus,
      handleInputBlur,
      handleSrcFilterUpdateValue,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          common: {
            cubicBezierEaseInOut,
            cubicBezierEaseIn,
            cubicBezierEaseOut
          },
          self: {
            width,
            borderRadius,
            borderColor,
            listColor,
            headerColor,
            titleTextColor,
            titleTextColorDisabled,
            extraTextColor,
            filterDividerColor,
            itemTextColor,
            itemColorPending,
            itemTextColorDisabled,
            extraFontSize,
            titleFontWeight,
            iconColor,
            iconColorDisabled,
            [createKey('fontSize', size)]: fontSize,
            [createKey('itemHeight', size)]: itemHeight
          }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-bezier-ease-in': cubicBezierEaseIn,
          '--n-bezier-ease-out': cubicBezierEaseOut,
          '--n-border-color': borderColor,
          '--n-border-radius': borderRadius,
          '--n-extra-font-size': extraFontSize,
          '--n-filter-divider-color': filterDividerColor,
          '--n-font-size': fontSize,
          '--n-header-color': headerColor,
          '--n-header-extra-text-color': extraTextColor,
          '--n-header-font-weight': titleFontWeight,
          '--n-header-text-color': titleTextColor,
          '--n-header-text-color-disabled': titleTextColorDisabled,
          '--n-item-color-pending': itemColorPending,
          '--n-item-height': itemHeight,
          '--n-item-text-color': itemTextColor,
          '--n-item-text-color-disabled': itemTextColorDisabled,
          '--n-list-color': listColor,
          '--n-width': width,
          '--n-icon-color': iconColor,
          '--n-icon-color-disabled': iconColorDisabled
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-transfer`,
          this.mergedDisabled && `${mergedClsPrefix}-transfer--disabled`,
          this.filterable && `${mergedClsPrefix}-transfer--filterable`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class={`${mergedClsPrefix}-transfer-list`}>
          <NTransferHeader
            source
            onChange={this.handleSrcHeaderCheck}
            title={this.sourceTitle}
          />
          <div class={`${mergedClsPrefix}-transfer-list-body`}>
            {this.filterable ? (
              <NTransferFilter
                onUpdateValue={this.handleSrcFilterUpdateValue}
                value={this.srcPattern}
                disabled={this.mergedDisabled}
                placeholder={this.sourceFilterPlaceholder}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              />
            ) : null}
            <div class={`${mergedClsPrefix}-transfer-list-flex-container`}>
              <NTransferList
                source
                options={this.filteredSrcOpts}
                disabled={this.mergedDisabled}
                virtualScroll={this.virtualScroll}
                isMounted={this.isMounted}
                isInputing={this.isInputing}
                itemSize={this.itemSize}
              />
            </div>
          </div>
          <div class={`${mergedClsPrefix}-transfer-list__border`} />
        </div>
        <div class={`${mergedClsPrefix}-transfer-list`}>
          <NTransferHeader title={this.targetTitle} />
          <div class={`${mergedClsPrefix}-transfer-list-body`}>
            <div class={`${mergedClsPrefix}-transfer-list-flex-container`}>
              <NTransferList
                options={this.tgtOpts}
                disabled={this.mergedDisabled}
                virtualScroll={this.virtualScroll}
                isMounted={this.isMounted}
                isInputing={this.isInputing}
                itemSize={this.itemSize}
              />
            </div>
          </div>
          <div class={`${mergedClsPrefix}-transfer-list__border`} />
        </div>
      </div>
    )
  }
})
