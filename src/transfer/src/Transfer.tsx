import {
  computed,
  defineComponent,
  h,
  provide,
  PropType,
  reactive,
  toRef,
  CSSProperties
} from 'vue'
import { useIsMounted } from 'vooks'
import { depx } from 'seemly'
import { ChevronLeftIcon, ChevronRightIcon } from '../../_base/icons'
import { NBaseIcon } from '../../_base'
import { NButton } from '../../button'
import { useLocale, useFormItem, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { createKey } from '../../_utils/cssr'
import { warn, call } from '../../_utils'
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
  TransferInjection
} from './interface'

export default defineComponent({
  name: 'Transfer',
  props: {
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
      type: Boolean,
      default: false
    },
    virtualScroll: {
      type: Boolean,
      default: false
    },
    sourceTitle: String,
    targetTitle: String,
    filterable: {
      type: Boolean,
      default: false
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
    // eslint-disable-next-line vue/prop-name-casing
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
  },
  setup (props) {
    const themeRef = useTheme(
      'Transfer',
      'Transfer',
      style,
      transferLight,
      props
    )
    const formItem = useFormItem(props)
    const itemSizeRef = computed(() => {
      const {
        mergedSize: { value: size }
      } = formItem
      const {
        self: { [createKey('itemHeight', size)]: itemSize }
      } = themeRef.value
      return depx(itemSize)
    })
    const {
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      avlSrcValueSet: avlSrcValueSetRef,
      avlTgtValueSet: avlTgtValueSetRef,
      tgtOpts: tgtOptsRef,
      srcOpts: srcOptsRef,
      filteredSrcOpts: filteredSrcOptsRef,
      filteredTgtOpts: filteredTgtOptsRef,
      srcCheckedValues: srcCheckedValuesRef,
      tgtCheckedValues: tgtCheckedValuesRef,
      srcCheckedStatus: srcCheckedStatusRef,
      tgtCheckedStatus: tgtCheckedStatusRef,
      srcPattern: srcPatternRef,
      tgtPattern: tgtPatternRef,
      isInputing: isInputingRef,
      fromButtonDisabled: fromButtonDisabledRef,
      toButtonDisabled: toButtonDisabledRef,
      handleInputFocus,
      handleInputBlur,
      handleTgtFilterUpdateValue,
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
    function handleSrcHeaderCheck (value: boolean): void {
      const {
        value: { checked, indeterminate }
      } = srcCheckedStatusRef
      if (indeterminate || checked) {
        srcCheckedValuesRef.value = []
      } else {
        srcCheckedValuesRef.value = Array.from(avlSrcValueSetRef.value)
      }
    }
    function handleTgtHeaderCheck (): void {
      const {
        value: { checked, indeterminate }
      } = tgtCheckedStatusRef
      if (indeterminate || checked) {
        tgtCheckedValuesRef.value = []
      } else {
        tgtCheckedValuesRef.value = Array.from(avlTgtValueSetRef.value)
      }
    }
    function handleTgtCheckboxClick (
      checked: boolean,
      optionValue: OptionValue
    ): void {
      if (checked) {
        tgtCheckedValuesRef.value.push(optionValue)
      } else {
        const index = tgtCheckedValuesRef.value.findIndex(
          (v) => v === optionValue
        )
        if (~index) {
          tgtCheckedValuesRef.value.splice(index, 1)
        }
      }
    }
    function handleSrcCheckboxClick (
      checked: boolean,
      optionValue: OptionValue
    ): void {
      if (checked) {
        srcCheckedValuesRef.value.push(optionValue)
      } else {
        const index = srcCheckedValuesRef.value.findIndex(
          (v) => v === optionValue
        )
        if (~index) {
          srcCheckedValuesRef.value.splice(index, 1)
        }
      }
    }
    function handleToTgtClick (): void {
      doUpdateValue(
        srcCheckedValuesRef.value.concat(mergedValueRef.value || [])
      )
      srcCheckedValuesRef.value = []
    }
    function handleToSrcClick (): void {
      const tgtCheckedValueSet = new Set(tgtCheckedValuesRef.value)
      doUpdateValue(
        (mergedValueRef.value || []).filter((v) => !tgtCheckedValueSet.has(v))
      )
      tgtCheckedValuesRef.value = []
    }
    provide<TransferInjection>(
      'NTransfer',
      reactive({
        mergedSize: formItem.mergedSize,
        disabled: toRef(props, 'disabled'),
        mergedTheme: themeRef,
        srcCheckedValues: srcCheckedValuesRef,
        tgtCheckedValues: tgtCheckedValuesRef,
        srcOpts: srcOptsRef,
        tgtOpts: tgtOptsRef,
        srcCheckedStatus: srcCheckedStatusRef,
        tgtCheckedStatus: tgtCheckedStatusRef,
        handleSrcCheckboxClick,
        handleTgtCheckboxClick
      })
    )
    return {
      ...formItem,
      ...useLocale('Transfer'),
      itemSize: itemSizeRef,
      isMounted: useIsMounted(),
      isInputing: isInputingRef,
      mergedTheme: themeRef,
      filteredSrcOpts: filteredSrcOptsRef,
      filteredTgtOpts: filteredTgtOptsRef,
      srcPattern: srcPatternRef,
      tgtPattern: tgtPatternRef,
      toButtonDisabled: toButtonDisabledRef,
      fromButtonDisabled: fromButtonDisabledRef,
      handleSrcHeaderCheck,
      handleTgtHeaderCheck,
      handleToSrcClick,
      handleToTgtClick,
      handleInputFocus,
      handleInputBlur,
      handleTgtFilterUpdateValue,
      handleSrcFilterUpdateValue,
      cssVars: computed(() => {
        const {
          mergedSize: { value: size }
        } = formItem
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
            headerExtraTextColor,
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
          '--bezier': cubicBezierEaseInOut,
          '--bezier-ease-in': cubicBezierEaseIn,
          '--bezier-ease-out': cubicBezierEaseOut,
          '--border-color': borderColor,
          '--border-radius': borderRadius,
          '--extra-font-size': extraFontSize,
          '--filter-divider-color': filterDividerColor,
          '--font-size': fontSize,
          '--header-color': headerColor,
          '--header-extra-text-color': headerExtraTextColor,
          '--header-font-weight': titleFontWeight,
          '--header-text-color': titleTextColor,
          '--header-text-color-disabled': titleTextColorDisabled,
          '--item-color-pending': itemColorPending,
          '--item-height': itemHeight,
          '--item-text-color': itemTextColor,
          '--item-text-color-disabled': itemTextColorDisabled,
          '--list-color': listColor,
          '--width': width,
          '--icon-color': iconColor,
          '--icon-color-disabled': iconColorDisabled
        }
      })
    }
  },
  render () {
    return (
      <div
        class={[
          'n-transfer',
          {
            'n-transfer--disabled': this.disabled,
            'n-transfer--filterable': this.filterable
          }
        ]}
        style={this.cssVars as CSSProperties}
      >
        <div class="n-transfer-list">
          <NTransferHeader
            source
            onChange={this.handleSrcHeaderCheck}
            title={this.sourceTitle || this.locale.sourceTitle}
          />
          <div class="n-transfer-list-body">
            {this.filterable ? (
              <NTransferFilter
                onUpdateValue={this.handleSrcFilterUpdateValue}
                value={this.srcPattern}
                disabled={this.disabled}
                placeholder={this.sourceFilterPlaceholder}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              />
            ) : null}
            <div class="n-transfer-list-flex-container">
              <NTransferList
                source
                options={this.filteredSrcOpts}
                disabled={this.disabled}
                virtualScroll={this.virtualScroll}
                isMounted={this.isMounted}
                isInputing={this.isInputing}
                itemSize={this.itemSize}
              />
            </div>
          </div>
          <div class="n-transfer-list__border" />
        </div>
        <div class="n-transfer-gap">
          <NButton
            disabled={this.toButtonDisabled || this.disabled}
            unstableTheme={this.mergedTheme.peers.Button}
            unstableThemeOverrides={this.mergedTheme.overrides.Button}
            onClick={this.handleToTgtClick}
          >
            {{
              icon: () => (
                <NBaseIcon>{{ default: () => <ChevronRightIcon /> }}</NBaseIcon>
              )
            }}
          </NButton>
          <NButton
            disabled={this.fromButtonDisabled || this.disabled}
            unstableTheme={this.mergedTheme.peers.Button}
            unstableThemeOverrides={this.mergedTheme.overrides.Button}
            onClick={this.handleToSrcClick}
          >
            {{
              icon: () => (
                <NBaseIcon>{{ default: () => <ChevronLeftIcon /> }}</NBaseIcon>
              )
            }}
          </NButton>
        </div>
        <div class="n-transfer-list">
          <NTransferHeader
            onChange={this.handleTgtHeaderCheck}
            title={this.targetTitle || this.locale.targetTitle}
          />
          <div class="n-transfer-list-body">
            {this.filterable ? (
              <NTransferFilter
                onUpdateValue={this.handleTgtFilterUpdateValue}
                value={this.tgtPattern}
                disabled={this.disabled}
                placeholder={this.targetFilterPlaceholder}
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}
              />
            ) : null}
            <div class="n-transfer-list-flex-container">
              <NTransferList
                options={this.filteredTgtOpts}
                disabled={this.disabled}
                virtualScroll={this.virtualScroll}
                isMounted={this.isMounted}
                isInputing={this.isInputing}
                itemSize={this.itemSize}
              />
            </div>
          </div>
          <div class="n-transfer-list__border" />
        </div>
      </div>
    )
  }
})
