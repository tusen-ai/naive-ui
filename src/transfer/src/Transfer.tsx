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
  TransferRenderSourceList,
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
  filterable: {
    type: Boolean,
    default: undefined
  },
  sourceFilterable: Boolean,
  targetFilterable: Boolean,
  showSelected: {
    type: Boolean,
    default: true
  },
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
  renderSourceList: Function as PropType<TransferRenderSourceList>,
  renderTargetList: Function as PropType<TransferRenderSourceList>,
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
        if (props.filterable !== undefined) {
          warnOnce(
            'transfer',
            '`filterable` is deprecated, please use `source-filterable` or `target-filterable` instead.'
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
      valueSetForCheckAllRef,
      valueSetForUncheckAllRef,
      valueSetForClearRef,
      filteredTgtOptionsRef,
      filteredSrcOptionsRef,
      targetOptionsRef,
      canNotSelectAnythingRef,
      canBeClearedRef,
      allCheckedRef,
      srcPatternRef,
      tgtPatternRef,
      mergedSrcFilterableRef,
      handleSrcFilterUpdateValue,
      handleTgtFilterUpdateValue
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

    function handleSourceCheckAll (): void {
      doUpdateValue([...valueSetForCheckAllRef.value])
    }

    function handleSourceUncheckAll (): void {
      doUpdateValue([...valueSetForUncheckAllRef.value])
    }

    function handleTargetClearAll (): void {
      doUpdateValue([...valueSetForClearRef.value])
    }

    function handleItemCheck (checked: boolean, optionValue: OptionValue): void {
      if (checked) {
        doUpdateValue((mergedValueRef.value || []).concat(optionValue))
      } else {
        doUpdateValue(
          (mergedValueRef.value || []).filter((v) => v !== optionValue)
        )
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
      renderTargetLabelRef: toRef(props, 'renderTargetLabel'),
      showSelectedRef: toRef(props, 'showSelected')
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedDisabled: mergedDisabledRef,
      itemSize: itemSizeRef,
      isMounted: useIsMounted(),
      mergedTheme: themeRef,
      filteredSrcOpts: filteredSrcOptionsRef,
      filteredTgtOpts: filteredTgtOptionsRef,
      srcPattern: srcPatternRef,
      tgtPattern: tgtPatternRef,
      mergedSize: mergedSizeRef,
      mergedSrcFilterable: mergedSrcFilterableRef,
      handleSrcFilterUpdateValue,
      handleTgtFilterUpdateValue,
      handleSourceCheckAll,
      handleSourceUncheckAll,
      handleTargetClearAll,
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
    const {
      mergedClsPrefix,
      renderSourceList,
      renderTargetList,
      mergedTheme,
      mergedSrcFilterable,
      targetFilterable
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-transfer`,
          this.mergedDisabled && `${mergedClsPrefix}-transfer--disabled`
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div
          class={`${mergedClsPrefix}-transfer-list ${mergedClsPrefix}-transfer-list--source`}
        >
          <NTransferHeader
            source
            title={this.sourceTitle}
            onCheckedAll={this.handleSourceCheckAll}
            onClearAll={this.handleSourceUncheckAll}
            size={this.mergedSize}
          />
          <div class={`${mergedClsPrefix}-transfer-list-body`}>
            {mergedSrcFilterable ? (
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
                        checkedOptions: this.filteredTgtOpts,
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
            onClearAll={this.handleTargetClearAll}
            size={this.mergedSize}
            title={this.targetTitle}
          />
          <div class={`${mergedClsPrefix}-transfer-list-body`}>
            {targetFilterable ? (
              <NTransferFilter
                onUpdateValue={this.handleTgtFilterUpdateValue}
                value={this.tgtPattern}
                disabled={this.mergedDisabled}
                placeholder={this.sourceFilterPlaceholder}
              />
            ) : null}
            <div class={`${mergedClsPrefix}-transfer-list-flex-container`}>
              {renderTargetList ? (
                <NScrollbar
                  theme={mergedTheme.peers.Scrollbar}
                  themeOverrides={mergedTheme.peerOverrides.Scrollbar}
                >
                  {{
                    default: () =>
                      renderTargetList({
                        onCheck: this.handleChecked,
                        checkedOptions: this.filteredTgtOpts,
                        pattern: this.tgtPattern
                      })
                  }}
                </NScrollbar>
              ) : (
                <NTransferList
                  options={this.filteredTgtOpts}
                  disabled={this.mergedDisabled}
                  virtualScroll={this.virtualScroll}
                  itemSize={this.itemSize}
                />
              )}
            </div>
          </div>
          <div class={`${mergedClsPrefix}-transfer-list__border`} />
        </div>
      </div>
    )
  }
})
