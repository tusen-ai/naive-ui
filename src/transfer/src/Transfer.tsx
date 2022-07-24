import {
  computed,
  defineComponent,
  h,
  provide,
  PropType,
  CSSProperties,
  watchEffect,
  toRef
} from 'vue'
import { useIsMounted } from 'vooks'
import { depx } from 'seemly'
import { NScrollbar } from '../../_internal'
import { useFormItem, useTheme, useConfig } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils/cssr'
import { call, ExtractPublicPropTypes, warnOnce } from '../../_utils'
import type { MaybeArray } from '../../_utils'
import { transferLight } from '../styles'
import type { TransferTheme } from '../styles'
import NTransferHeader from './TransferHeader'
import NTransferList from './TransferList'
import NTransferFilter from './TransferFilter'
import { useTransferData } from './use-transfer-data'
import {
  OptionValue,
  Option,
  Filter,
  OnUpdateValue,
  transferInjectionKey,
  TransferRenderTargetLabel,
  RenderSourceListType,
  TransferRenderSourceLabel
} from './interface'
import style from './styles/index.cssr'

export const transferProps = {
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
  renderSourceLabel: Function as PropType<TransferRenderSourceLabel>,
  renderTargetLabel: Function as PropType<TransferRenderTargetLabel>,
  renderSourceList: Function as PropType<RenderSourceListType>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onChange: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>
} as const

export type TransferProps = ExtractPublicPropTypes<typeof transferProps>

export default defineComponent({
  name: 'Transfer',
  props: transferProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce(
            'transfer',
            '`on-change` is deprecated, please use `on-update:value` instead.'
          )
        }
      })
    }
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
      uncontrolledValueRef,
      mergedValueRef,
      targetValueSetRef,
      valueSetForSelectAllRef,
      valueSetForUnselectAllRef,
      targetOptionsRef,
      filteredSrcOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      srcPatternRef,
      handleSrcFilterUpdateValue
    } = useTransferData(props)
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

    function handleClearAll (): void {
      doUpdateValue([...valueSetForUnselectAllRef.value])
    }

    function handleCheckedAll (): void {
      doUpdateValue([...valueSetForSelectAllRef.value])
    }

    function handleItemCheck (checked: boolean, optionValue: OptionValue): void {
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

    function handleChecked (optionValueList: OptionValue[]): void {
      doUpdateValue(optionValueList)
    }

    provide(transferInjectionKey, {
      targetValueSetRef,
      mergedClsPrefixRef,
      disabledRef: mergedDisabledRef,
      mergedThemeRef: themeRef,
      targetOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      srcOptionsLengthRef: computed(() => props.options.length),
      handleItemCheck,
      renderSourceLabelRef: toRef(props, 'renderSourceLabel'),
      renderTargetLabelRef: toRef(props, 'renderTargetLabel')
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      itemSize: itemSizeRef,
      isMounted: useIsMounted(),
      mergedTheme: themeRef,
      filteredSrcOpts: filteredSrcOptionsRef,
      tgtOpts: targetOptionsRef,
      srcPattern: srcPatternRef,
      mergedSize: mergedSizeRef,
      handleSrcFilterUpdateValue,
      handleCheckedAll,
      handleClearAll,
      handleItemCheck,
      handleChecked,
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const {
          common: { cubicBezierEaseInOut },
          self: {
            borderRadius,
            borderColor,
            listColor,
            titleTextColor,
            titleTextColorDisabled,
            extraTextColor,
            itemTextColor,
            itemColorPending,
            itemTextColorDisabled,
            titleFontWeight,
            closeColorHover,
            closeColorPressed,
            closeIconColor,
            closeIconColorHover,
            closeIconColorPressed,
            closeIconSize,
            closeSize,
            dividerColor,
            extraTextColorDisabled,
            [createKey('extraFontSize', size)]: extraFontSize,
            [createKey('fontSize', size)]: fontSize,
            [createKey('titleFontSize', size)]: titleFontSize,
            [createKey('itemHeight', size)]: itemHeight,
            [createKey('headerHeight', size)]: headerHeight
          }
        } = themeRef.value
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-border-color': borderColor,
          '--n-border-radius': borderRadius,
          '--n-extra-font-size': extraFontSize,
          '--n-font-size': fontSize,
          '--n-header-font-size': titleFontSize,
          '--n-header-extra-text-color': extraTextColor,
          '--n-header-extra-text-color-disabled': extraTextColorDisabled,
          '--n-header-font-weight': titleFontWeight,
          '--n-header-text-color': titleTextColor,
          '--n-header-text-color-disabled': titleTextColorDisabled,
          '--n-item-color-pending': itemColorPending,
          '--n-item-height': itemHeight,
          '--n-item-text-color': itemTextColor,
          '--n-item-text-color-disabled': itemTextColorDisabled,
          '--n-list-color': listColor,
          '--n-header-height': headerHeight,
          '--n-close-size': closeSize,
          '--n-close-icon-size': closeIconSize,
          '--n-close-color-hover': closeColorHover,
          '--n-close-color-pressed': closeColorPressed,
          '--n-close-icon-color': closeIconColor,
          '--n-close-icon-color-hover': closeIconColorHover,
          '--n-close-icon-color-pressed': closeIconColorPressed,
          '--n-divider-color': dividerColor
        }
      })
    }
  },
  render () {
    const { mergedClsPrefix, renderSourceList, mergedTheme } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-transfer`,
          this.mergedDisabled && `${mergedClsPrefix}-transfer--disabled`,
          this.filterable && `${mergedClsPrefix}-transfer--filterable`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={`${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--source`}
        >
          <NTransferHeader
            source
            title={this.sourceTitle}
            onCheckedAll={this.handleCheckedAll}
            onClearAll={this.handleClearAll}
            size={this.mergedSize}
          />
          <div class={`${mergedClsPrefix}-transfer-list-body`}>
            {this.filterable ? (
              <NTransferFilter
                onUpdateValue={this.handleSrcFilterUpdateValue}
                value={this.srcPattern}
                disabled={this.mergedDisabled}
                placeholder={this.sourceFilterPlaceholder}
              />
            ) : null}
            <div class={`${mergedClsPrefix}-transfer-list-flex-container`}>
              {renderSourceList ? (
                <NScrollbar
                  theme={mergedTheme.peers.Scrollbar}
                  themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                >
                  {{
                    default: () =>
                      renderSourceList({
                        onCheck: this.handleChecked,
                        checkedOptions: this.tgtOpts,
                        pattern: this.srcPattern
                      })
                  }}
                </NScrollbar>
              ) : (
                <NTransferList
                  source
                  options={this.filteredSrcOpts}
                  disabled={this.mergedDisabled}
                  virtualScroll={this.virtualScroll}
                  itemSize={this.itemSize}
                />
              )}
            </div>
          </div>
          <div class={`${mergedClsPrefix}-transfer-list__border`} />
        </div>
        <div
          class={`${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--target`}
        >
          <NTransferHeader
            onClearAll={this.handleClearAll}
            size={this.mergedSize}
            title={this.targetTitle}
          />
          <div class={`${mergedClsPrefix}-transfer-list-body`}>
            <div class={`${mergedClsPrefix}-transfer-list-flex-container`}>
              <NTransferList
                options={this.tgtOpts}
                disabled={this.mergedDisabled}
                virtualScroll={this.virtualScroll}
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
