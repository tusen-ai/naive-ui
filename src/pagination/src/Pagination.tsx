/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  h,
  nextTick,
  computed,
  ref,
  toRef,
  defineComponent,
  PropType,
  CSSProperties,
  watchEffect
} from 'vue'
import { useMergedState } from 'vooks'
import { NSelect } from '../../select'
import { InputInst, NInput } from '../../input'
import { NBaseIcon } from '../../_internal'
import {
  FastForwardIcon,
  FastBackwardIcon,
  BackwardIcon,
  ForwardIcon,
  MoreIcon
} from '../../_internal/icons'
import { useConfig, useLocale, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { paginationLight, PaginationTheme } from '../styles'
import { pageItems } from './utils'
import type { PageItem } from './utils'
import style from './styles/index.cssr'
import { call, ExtractPublicPropTypes, MaybeArray, warn } from '../../_utils'
import type { Size as InputSize } from '../../input/src/interface'
import type { Size as SelectSize } from '../../select/src/interface'
import {
  RenderPrefix,
  RenderSuffix,
  RenderPrev,
  RenderNext,
  PaginationSizeOption
} from './interface'

const paginationProps = {
  ...(useTheme.props as ThemeProps<PaginationTheme>),
  page: Number,
  defaultPage: {
    type: Number,
    default: 1
  },
  itemCount: Number,
  pageCount: Number,
  defaultPageCount: {
    type: Number,
    default: 1
  },
  showSizePicker: Boolean,
  pageSize: Number as PropType<number>,
  defaultPageSize: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<Array<number | PaginationSizeOption>>,
    default () {
      return [10]
    }
  },
  showQuickJumper: Boolean,
  disabled: Boolean,
  pageSlot: {
    type: Number,
    default: 9
  },
  prev: Function as PropType<RenderPrev>,
  next: Function as PropType<RenderNext>,
  prefix: Function as PropType<RenderPrefix>,
  suffix: Function as PropType<RenderSuffix>,
  'onUpdate:page': [Function, Array] as PropType<
  MaybeArray<(page: number) => void>
  >,
  onUpdatePage: [Function, Array] as PropType<
  MaybeArray<(page: number) => void>
  >,
  'onUpdate:pageSize': [Function, Array] as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  onUpdatePageSize: [Function, Array] as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  /** @deprecated */
  onPageSizeChange: [Function, Array] as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  /** @deprecated */
  onChange: [Function, Array] as PropType<MaybeArray<(page: number) => void>>
} as const

export type PaginationProps = ExtractPublicPropTypes<typeof paginationProps>

export default defineComponent({
  name: 'Pagination',
  props: paginationProps,
  setup (props) {
    if (__DEV__) {
      watchEffect(() => {
        if (props.pageCount !== undefined && props.itemCount !== undefined) {
          warn(
            'pagination',
            "`page-count` and `item-count` should't be specified together. Only `item-count` will take effect."
          )
        }
      })
    }
    const { NConfigProvider, mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Pagination',
      'Pagination',
      style,
      paginationLight,
      props,
      mergedClsPrefixRef
    )
    const { localeRef } = useLocale('Pagination')
    const selfRef = ref<HTMLElement | null>(null)
    const jumperRef = ref<InputInst | null>(null)
    const jumperValueRef = ref('')
    const uncontrolledPageRef = ref(props.defaultPage)
    const uncontrolledPageSizeRef = ref(props.defaultPageSize)
    const mergedPageRef = useMergedState(
      toRef(props, 'page'),
      uncontrolledPageRef
    )
    const mergedPageSizeRef = useMergedState(
      toRef(props, 'pageSize'),
      uncontrolledPageSizeRef
    )
    const mergedPageCountRef = computed(() => {
      // item count has high priority, for it can affect prefix slot rendering
      const { itemCount } = props
      if (itemCount !== undefined) {
        return Math.max(1, Math.ceil(itemCount / mergedPageSizeRef.value))
      }
      const { pageCount } = props
      if (pageCount !== undefined) return pageCount
      return 1
    })
    const showFastForwardRef = ref(false)
    const showFastBackwardRef = ref(false)

    const pageSizeOptionsRef = computed(() => {
      const suffix = localeRef.value.selectionSuffix
      return props.pageSizes.map((size) => {
        if (typeof size === 'number') {
          return {
            label: `${size} / ${suffix}`,
            value: size
          }
        } else {
          return size
        }
      })
    })
    const inputSizeRef = computed<InputSize>(() => {
      return (
        NConfigProvider?.mergedComponentPropsRef.value?.Pagination?.inputSize ||
        'small'
      )
    })
    const selectSizeRef = computed<SelectSize>(() => {
      return (
        NConfigProvider?.mergedComponentPropsRef.value?.Pagination
          ?.selectSize || 'small'
      )
    })
    const startIndexRef = computed(() => {
      return (mergedPageRef.value - 1) * mergedPageSizeRef.value
    })
    const endIndexRef = computed(() => {
      const endIndex = mergedPageRef.value * mergedPageSizeRef.value - 1
      const { itemCount } = props
      if (itemCount !== undefined) {
        return endIndex > itemCount ? itemCount : endIndex
      }
      return endIndex
    })
    const mergedItemCountRef = computed(() => {
      const { itemCount } = props
      if (itemCount !== undefined) return itemCount
      return (props.pageCount || 1) * mergedPageSizeRef.value
    })

    const disableTransitionOneTick = (): void => {
      void nextTick(() => {
        const { value: selfEl } = selfRef
        if (!selfEl) return
        selfEl.classList.add('transition-disabled')
        void selfRef.value?.offsetWidth
        selfEl.classList.remove('transition-disabled')
      })
    }
    function doUpdatePage (page: number): void {
      if (page === mergedPageRef.value) return
      const { 'onUpdate:page': _onUpdatePage, onUpdatePage, onChange } = props
      if (_onUpdatePage) call(_onUpdatePage, page)
      if (onUpdatePage) call(onUpdatePage, page)
      // deprecated
      if (onChange) call(onChange, page)
      uncontrolledPageRef.value = page
    }
    function doUpdatePageSize (pageSize: number): void {
      if (pageSize === mergedPageSizeRef.value) return
      const {
        'onUpdate:pageSize': _onUpdatePageSize,
        onUpdatePageSize,
        onPageSizeChange
      } = props
      if (_onUpdatePageSize) call(_onUpdatePageSize, pageSize)
      if (onUpdatePageSize) call(onUpdatePageSize, pageSize)
      // deprecated
      if (onPageSizeChange) call(onPageSizeChange, pageSize)
      uncontrolledPageSizeRef.value = pageSize
      // update new page when overflows.
      // we may have different update strategy, but i've no time to impl it
      if (mergedPageCountRef.value < mergedPageRef.value) {
        doUpdatePage(mergedPageCountRef.value)
      }
    }
    function forward (): void {
      if (props.disabled) return
      const page = Math.min(mergedPageRef.value + 1, mergedPageCountRef.value)
      doUpdatePage(page)
    }
    function backward (): void {
      if (props.disabled) return
      const page = Math.max(mergedPageRef.value - 1, 1)
      doUpdatePage(page)
    }
    function fastForward (): void {
      if (props.disabled) return
      const page = Math.min(
        mergedPageRef.value + (props.pageSlot - 4),
        mergedPageCountRef.value
      )
      doUpdatePage(page)
    }
    function fastBackward (): void {
      if (props.disabled) return
      const page = Math.max(mergedPageRef.value - (props.pageSlot - 4), 1)
      doUpdatePage(page)
    }
    function handleSizePickerChange (value: number): void {
      doUpdatePageSize(value)
    }
    function handleQuickJumperKeyUp (e: KeyboardEvent): void {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        const page = parseInt(jumperValueRef.value)
        if (
          !Number.isNaN(page) &&
          page >= 1 &&
          page <= mergedPageCountRef.value
        ) {
          doUpdatePage(page)
          jumperValueRef.value = ''
          jumperRef.value?.blur()
        }
      }
    }
    function handlePageItemClick (pageItem: PageItem): void {
      if (props.disabled) return
      switch (pageItem.type) {
        case 'page':
          doUpdatePage(pageItem.label)
          break
        case 'fastBackward':
          fastBackward()
          break
        case 'fastForward':
          fastForward()
          break
      }
    }
    function handlePageItemMouseEnter (pageItem: PageItem): void {
      if (props.disabled) return
      switch (pageItem.type) {
        case 'fastBackward':
          showFastBackwardRef.value = true
          break
        case 'fastForward':
          showFastForwardRef.value = true
          break
        default:
          return
      }
      disableTransitionOneTick()
    }
    function handlePageItemMouseLeave (pageItem: PageItem): void {
      if (props.disabled) return
      switch (pageItem.type) {
        case 'fastBackward':
          showFastBackwardRef.value = false
          break
        case 'fastForward':
          showFastForwardRef.value = false
          break
        default:
          return
      }
      disableTransitionOneTick()
    }
    function handleJumperInput (value: string): void {
      jumperValueRef.value = value
    }
    watchEffect(() => {
      void mergedPageRef.value
      void mergedPageSizeRef.value
      disableTransitionOneTick()
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      locale: localeRef,
      selfRef,
      jumperRef,
      mergedPage: mergedPageRef,
      showFastBackward: showFastBackwardRef,
      showFastForward: showFastForwardRef,
      pageItems: computed(() =>
        pageItems(mergedPageRef.value, mergedPageCountRef.value, props.pageSlot)
      ),
      mergedItemCount: mergedItemCountRef,
      jumperValue: jumperValueRef,
      pageSizeOptions: pageSizeOptionsRef,
      mergedPageSize: mergedPageSizeRef,
      inputSize: inputSizeRef,
      selectSize: selectSizeRef,
      mergedTheme: themeRef,
      mergedPageCount: mergedPageCountRef,
      startIndex: startIndexRef,
      endIndex: endIndexRef,
      handleJumperInput,
      handleBackwardClick: backward,
      handleForwardClick: forward,
      handlePageItemClick,
      handleSizePickerChange,
      handleQuickJumperKeyUp,
      handlePageItemMouseEnter,
      handlePageItemMouseLeave,
      cssVars: computed(() => {
        const {
          self: {
            itemSize,
            itemPadding,
            itemMargin,
            inputWidth,
            selectWidth,
            inputMargin,
            selectMargin,
            buttonBorder,
            buttonBorderHover,
            buttonBorderPressed,
            buttonIconColor,
            buttonIconColorHover,
            buttonIconColorPressed,
            buttonIconSize,
            itemTextColor,
            itemTextColorHover,
            itemTextColorPressed,
            itemTextColorActive,
            itemTextColorDisabled,
            itemColor,
            itemColorHover,
            itemColorPressed,
            itemColorActive,
            itemColorActiveHover,
            itemColorDisabled,
            itemBorder,
            itemBorderHover,
            itemBorderPressed,
            itemBorderActive,
            itemBorderDisabled,
            itemBorderRadius,
            itemFontSize,
            jumperFontSize,
            jumperTextColor,
            jumperTextColorDisabled,
            prefixMargin,
            suffixMargin,
            buttonColor,
            buttonColorHover,
            buttonColorPressed
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--n-prefix-margin': prefixMargin,
          '--n-suffix-margin': suffixMargin,
          '--n-item-font-size': itemFontSize,
          '--n-select-width': selectWidth,
          '--n-select-margin': selectMargin,
          '--n-input-width': inputWidth,
          '--n-input-margin': inputMargin,
          '--n-item-size': itemSize,
          '--n-item-text-color': itemTextColor,
          '--n-item-text-color-disabled': itemTextColorDisabled,
          '--n-item-text-color-hover': itemTextColorHover,
          '--n-item-text-color-active': itemTextColorActive,
          '--n-item-text-color-pressed': itemTextColorPressed,
          '--n-item-color': itemColor,
          '--n-item-color-hover': itemColorHover,
          '--n-item-color-disabled': itemColorDisabled,
          '--n-item-color-active': itemColorActive,
          '--n-item-color-active-hover': itemColorActiveHover,
          '--n-item-color-pressed': itemColorPressed,
          '--n-item-border': itemBorder,
          '--n-item-border-hover': itemBorderHover,
          '--n-item-border-disabled': itemBorderDisabled,
          '--n-item-border-active': itemBorderActive,
          '--n-item-border-pressed': itemBorderPressed,
          '--n-item-padding': itemPadding,
          '--n-item-border-radius': itemBorderRadius,
          '--n-bezier': cubicBezierEaseInOut,
          '--n-jumper-font-size': jumperFontSize,
          '--n-jumper-text-color': jumperTextColor,
          '--n-jumper-text-color-disabled': jumperTextColorDisabled,
          '--n-item-margin': itemMargin,
          '--n-button-icon-size': buttonIconSize,
          '--n-button-icon-color': buttonIconColor,
          '--n-button-icon-color-hover': buttonIconColorHover,
          '--n-button-icon-color-pressed': buttonIconColorPressed,
          '--n-button-color-hover': buttonColorHover,
          '--n-button-color': buttonColor,
          '--n-button-color-pressed': buttonColorPressed,
          '--n-button-border': buttonBorder,
          '--n-button-border-hover': buttonBorderHover,
          '--n-button-border-pressed': buttonBorderPressed
        }
      })
    }
  },
  render () {
    // it's ok to expand all prop here since no slots' deps
    const {
      $slots,
      mergedClsPrefix,
      disabled,
      cssVars,
      mergedPage,
      mergedPageCount,
      pageItems,
      showFastBackward,
      showFastForward,
      showSizePicker,
      showQuickJumper,
      mergedTheme,
      locale,
      inputSize,
      selectSize,
      mergedPageSize,
      pageSizeOptions,
      jumperValue,
      prev,
      next,
      prefix,
      suffix,
      handleJumperInput,
      handleSizePickerChange,
      handleBackwardClick,
      handlePageItemClick,
      handlePageItemMouseEnter,
      handlePageItemMouseLeave,
      handleForwardClick,
      handleQuickJumperKeyUp
    } = this
    const renderPrev = prev || $slots.prev
    const renderNext = next || $slots.next
    return (
      <div
        ref="selfRef"
        class={[
          `${mergedClsPrefix}-pagination`,
          disabled && `${mergedClsPrefix}-pagination--disabled`
        ]}
        style={cssVars as CSSProperties}
      >
        {prefix || $slots.prefix ? (
          <div class={`${mergedClsPrefix}-pagination-prefix`}>
            {($slots.prefix
              ? ($slots.prefix as unknown as RenderPrefix)
              : prefix!)({
              page: mergedPage,
              pageSize: mergedPageSize,
              pageCount: mergedPageCount,
              startIndex: this.startIndex,
              endIndex: this.endIndex,
              itemCount: this.mergedItemCount
            })}
          </div>
        ) : null}
        <div
          class={[
            `${mergedClsPrefix}-pagination-item`,
            !renderPrev && `${mergedClsPrefix}-pagination-item--button`,
            (mergedPage <= 1 || mergedPage > mergedPageCount || disabled) &&
              `${mergedClsPrefix}-pagination-item--disabled`
          ]}
          onClick={handleBackwardClick}
        >
          {renderPrev ? (
            renderPrev({
              page: mergedPage,
              pageSize: mergedPageSize,
              pageCount: mergedPageCount,
              startIndex: this.startIndex,
              endIndex: this.endIndex,
              itemCount: this.mergedItemCount
            })
          ) : (
            <NBaseIcon clsPrefix={mergedClsPrefix}>
              {{ default: () => <BackwardIcon /> }}
            </NBaseIcon>
          )}
        </div>
        {pageItems.map((pageItem, index) => {
          return (
            <div
              key={index}
              class={[
                `${mergedClsPrefix}-pagination-item`,
                {
                  [`${mergedClsPrefix}-pagination-item--active`]:
                    pageItem.active,
                  [`${mergedClsPrefix}-pagination-item--disabled`]: disabled
                }
              ]}
              onClick={() => handlePageItemClick(pageItem)}
              onMouseenter={() => handlePageItemMouseEnter(pageItem)}
              onMouseleave={() => handlePageItemMouseLeave(pageItem)}
            >
              {pageItem.type === 'page' ? pageItem.label : null}
              {pageItem.type === 'fastBackward' ? (
                showFastBackward ? (
                  <NBaseIcon clsPrefix={mergedClsPrefix}>
                    {{ default: () => <FastBackwardIcon /> }}
                  </NBaseIcon>
                ) : (
                  <NBaseIcon clsPrefix={mergedClsPrefix}>
                    {{ default: () => <MoreIcon /> }}
                  </NBaseIcon>
                )
              ) : null}
              {pageItem.type === 'fastForward' ? (
                showFastForward ? (
                  <NBaseIcon clsPrefix={mergedClsPrefix}>
                    {{ default: () => <FastForwardIcon /> }}
                  </NBaseIcon>
                ) : (
                  <NBaseIcon clsPrefix={mergedClsPrefix}>
                    {{ default: () => <MoreIcon /> }}
                  </NBaseIcon>
                )
              ) : null}
            </div>
          )
        })}
        <div
          class={[
            `${mergedClsPrefix}-pagination-item`,
            !renderNext && `${mergedClsPrefix}-pagination-item--button`,
            {
              [`${mergedClsPrefix}-pagination-item--disabled`]:
                mergedPage < 1 || mergedPage >= mergedPageCount || disabled
            }
          ]}
          onClick={handleForwardClick}
        >
          {renderNext ? (
            renderNext({
              page: mergedPage,
              pageSize: mergedPageSize,
              pageCount: mergedPageCount,
              itemCount: this.mergedItemCount,
              startIndex: this.startIndex,
              endIndex: this.endIndex
            })
          ) : (
            <NBaseIcon clsPrefix={mergedClsPrefix}>
              {{ default: () => <ForwardIcon /> }}
            </NBaseIcon>
          )}
        </div>
        {showSizePicker ? (
          <NSelect
            size={selectSize}
            placeholder=""
            options={pageSizeOptions}
            value={mergedPageSize}
            disabled={disabled}
            theme={mergedTheme.peers.Select}
            themeOverrides={mergedTheme.peerOverrides.Select}
            onUpdateValue={handleSizePickerChange as any}
          />
        ) : null}
        {showQuickJumper ? (
          <div class={`${mergedClsPrefix}-pagination-quick-jumper`}>
            {locale.goto}
            <NInput
              ref="jumperRef"
              value={jumperValue}
              onUpdateValue={handleJumperInput}
              size={inputSize}
              placeholder=""
              disabled={disabled}
              theme={mergedTheme.peers.Input}
              themeOverrides={mergedTheme.peerOverrides.Input}
              onKeyup={handleQuickJumperKeyUp}
            />
          </div>
        ) : null}
        {suffix || $slots.suffix ? (
          <div class={`${mergedClsPrefix}-pagination-suffix`}>
            {($slots.suffix
              ? ($slots.suffix as unknown as RenderSuffix)
              : suffix!)({
              page: mergedPage,
              pageSize: mergedPageSize,
              pageCount: mergedPageCount,
              startIndex: this.startIndex,
              endIndex: this.endIndex,
              itemCount: this.mergedItemCount
            })}
          </div>
        ) : null}
      </div>
    )
  }
})
