import {
  h,
  nextTick,
  computed,
  ref,
  toRef,
  watch,
  defineComponent,
  PropType,
  CSSProperties,
  ExtractPropTypes
} from 'vue'
import { useCompitable, useMergedState } from 'vooks'
import { NSelect } from '../../select'
import { InputRef, NInput } from '../../input'
import { NBaseIcon } from '../../_internal'
import {
  FastForwardIcon,
  FastBackwardIcon,
  BackwardIcon,
  ForwardIcon,
  MoreIcon
} from '../../_internal/icons'
import { useLocale, useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { paginationLight, PaginationTheme } from '../styles'
import { pageItems } from './utils'
import type { PageItem } from './utils'
import style from './styles/index.cssr'
import { call, MaybeArray } from '../../_utils'

const paginationProps = {
  page: {
    type: Number,
    required: undefined
  },
  defaultPage: {
    type: Number,
    default: 1
  },
  pageCount: {
    type: Number,
    validator: (value: any) => {
      return Number.isInteger(value) && value > 0
    },
    default: undefined
  },
  defaultPageCount: {
    type: Number,
    validator: (value: any) => {
      return Number.isInteger(value) && value > 0
    },
    default: 1
  },
  showSizePicker: {
    type: Boolean,
    default: false
  },
  pageSize: Number as PropType<number>,
  defaultPageSize: {
    type: Number as PropType<number>,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10]
  },
  showQuickJumper: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  pageSlot: {
    type: Number,
    default: 9
  },
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:page': Function as PropType<MaybeArray<(page: number) => void>>,
  // eslint-disable-next-line vue/prop-name-casing
  'onUpdate:pageSize': Function as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  // deprecated
  onPageSizeChange: Function as PropType<
  MaybeArray<(pageSize: number) => void>
  >,
  onChange: Function as PropType<MaybeArray<(page: number) => void>>,
  total: {
    type: Number,
    validator: (value: any) => {
      return Number.isInteger(value) && value > 0
    },
    default: undefined
  }
} as const

export type PaginationProps = Partial<ExtractPropTypes<typeof paginationProps>>

export default defineComponent({
  name: 'Pagination',
  props: {
    ...(useTheme.props as ThemeProps<PaginationTheme>),
    ...paginationProps
  },
  setup (props) {
    const themeRef = useTheme(
      'Pagination',
      'Pagination',
      style,
      paginationLight,
      props
    )
    const { locale } = useLocale('Pagination')
    const selfRef = ref<HTMLElement | null>(null)
    const jumperRef = ref<InputRef | null>(null)
    const compitablePageCountRef = useCompitable(props, ['pageCount', 'total'])
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
    const showFastForwardRef = ref(false)
    const showFastBackwardRef = ref(false)
    const transitionDisabledRef = ref(false)

    const pageSizeOptionsRef = computed(() => {
      const suffix = locale.value.selectionSuffix
      return props.pageSizes.map((size) => ({
        label: `${size} / ${suffix}`,
        value: size
      }))
    })
    // unstable feature
    const inputSizeRef = computed<'small'>(() => {
      // const { unstableConfig } = this.$naive
      // const size = unstableConfig?.Pagination?.inputSize
      // if (size) {
      //   return size
      // }
      return 'small'
    })

    const disableTransitionOneTick = (): void => {
      transitionDisabledRef.value = true
      void nextTick(() => {
        void selfRef.value?.offsetWidth
        transitionDisabledRef.value = false
      })
    }
    watch(mergedPageRef, disableTransitionOneTick)
    function doUpdatePage (page: number): void {
      if (page === mergedPageRef.value) return
      const { 'onUpdate:page': onUpdatePage, onChange } = props
      if (onUpdatePage) call(onUpdatePage, page)
      // deprecated
      if (onChange) call(onChange, page)
    }
    function doUpdatePageSize (pageSize: number): void {
      if (pageSize === mergedPageSizeRef.value) return
      const { 'onUpdate:pageSize': onUpdatePageSize, onPageSizeChange } = props
      if (onUpdatePageSize) call(onUpdatePageSize, pageSize)
      // deprecated
      if (onPageSizeChange) call(onPageSizeChange, pageSize)
    }
    function forward (): void {
      if (props.disabled) return
      const page = Math.min(
        mergedPageRef.value + 1,
        compitablePageCountRef.value
      )
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
        compitablePageCountRef.value
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
      if (e.code === 'Enter') {
        const page = parseInt(jumperValueRef.value)
        if (
          !Number.isNaN(page) &&
          page >= 1 &&
          page <= compitablePageCountRef.value
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
        default:
          return
        case 'fastBackward':
          showFastBackwardRef.value = true
          break
        case 'fastForward':
          showFastForwardRef.value = true
          break
      }
      disableTransitionOneTick()
    }
    function handlePageItemMouseLeave (pageItem: PageItem): void {
      if (props.disabled) return
      switch (pageItem.type) {
        default:
          return
        case 'fastBackward':
          showFastBackwardRef.value = false
          break
        case 'fastForward':
          showFastForwardRef.value = false
          break
      }
      disableTransitionOneTick()
    }
    function handleJumperInput (value: string): void {
      jumperValueRef.value = value
    }
    return {
      locale,
      selfRef,
      jumperRef,
      mergedPage: mergedPageRef,
      showFastBackward: showFastBackwardRef,
      showFastForward: showFastForwardRef,
      compitablePageCount: compitablePageCountRef,
      pageItems: computed(() =>
        pageItems(
          mergedPageRef.value,
          compitablePageCountRef.value,
          props.pageSlot
        )
      ),
      jumperValue: jumperValueRef,
      pageSizeOptions: pageSizeOptionsRef,
      inputSize: inputSizeRef,
      transitionDisabled: transitionDisabledRef,
      mergedTheme: themeRef,
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
            jumperTextColorDisabled
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--item-font-size': itemFontSize,
          '--select-width': selectWidth,
          '--select-margin': selectMargin,
          '--input-width': inputWidth,
          '--input-margin': inputMargin,
          '--item-size': itemSize,
          '--item-text-color': itemTextColor,
          '--item-text-color-disabled': itemTextColorDisabled,
          '--item-text-color-hover': itemTextColorHover,
          '--item-text-color-active': itemTextColorActive,
          '--item-text-color-pressed': itemTextColorPressed,
          '--item-color': itemColor,
          '--item-color-hover': itemColorHover,
          '--item-color-disabled': itemColorDisabled,
          '--item-color-active': itemColorActive,
          '--item-color-pressed': itemColorPressed,
          '--item-border': itemBorder,
          '--item-border-hover': itemBorderHover,
          '--item-border-disabled': itemBorderDisabled,
          '--item-border-active': itemBorderActive,
          '--item-border-pressed': itemBorderPressed,
          '--item-padding': itemPadding,
          '--item-border-radius': itemBorderRadius,
          '--bezier': cubicBezierEaseInOut,
          '--jumper-font-size': jumperFontSize,
          '--jumper-text-color': jumperTextColor,
          '--jumper-text-color-disabled': jumperTextColorDisabled,
          '--item-margin': itemMargin,
          '--button-icon-size': buttonIconSize,
          '--button-icon-color': buttonIconColor,
          '--button-icon-color-hover': buttonIconColorHover,
          '--button-icon-color-pressed': buttonIconColorPressed,
          '--button-border': buttonBorder,
          '--button-border-hover': buttonBorderHover,
          '--button-border-pressed': buttonBorderPressed
        }
      })
    }
  },
  render () {
    // it's ok to expand all prop here since no slots' deps
    const {
      transitionDisabled,
      disabled,
      cssVars,
      mergedPage,
      compitablePageCount,
      pageItems,
      showFastBackward,
      showFastForward,
      showSizePicker,
      showQuickJumper,
      mergedTheme,
      locale,
      inputSize,
      pageSize,
      pageSizeOptions,
      jumperValue,
      handleJumperInput,
      handleSizePickerChange,
      handleBackwardClick,
      handlePageItemClick,
      handlePageItemMouseEnter,
      handlePageItemMouseLeave,
      handleForwardClick,
      handleQuickJumperKeyUp
    } = this
    return (
      <div
        ref="selfRef"
        class={[
          'n-pagination',
          {
            'n-pagination--transition-disabled': transitionDisabled,
            'n-pagination--disabled': disabled
          }
        ]}
        style={cssVars as CSSProperties}
      >
        <div
          class={[
            'n-pagination-item n-pagination-item--button',
            {
              'n-pagination-item--disabled':
                mergedPage <= 1 || mergedPage > compitablePageCount || disabled
            }
          ]}
          onClick={handleBackwardClick}
        >
          <NBaseIcon>{{ default: () => <BackwardIcon /> }}</NBaseIcon>
        </div>
        {pageItems.map((pageItem, index) => {
          return (
            <div
              key={index}
              class={[
                'n-pagination-item',
                {
                  'n-pagination-item--active': pageItem.active,
                  'n-pagination-item--disabled': disabled
                }
              ]}
              onClick={() => handlePageItemClick(pageItem)}
              onMouseenter={() => handlePageItemMouseEnter(pageItem)}
              onMouseleave={() => handlePageItemMouseLeave(pageItem)}
            >
              {pageItem.type === 'page' ? pageItem.label : null}
              {pageItem.type === 'fastBackward' ? (
                showFastBackward ? (
                  <NBaseIcon>
                    {{ default: () => <FastBackwardIcon /> }}
                  </NBaseIcon>
                ) : (
                  <NBaseIcon>{{ default: () => <MoreIcon /> }}</NBaseIcon>
                )
              ) : null}
              {pageItem.type === 'fastForward' ? (
                showFastForward ? (
                  <NBaseIcon>
                    {{ default: () => <FastForwardIcon /> }}
                  </NBaseIcon>
                ) : (
                  <NBaseIcon>{{ default: () => <MoreIcon /> }}</NBaseIcon>
                )
              ) : null}
            </div>
          )
        })}
        <div
          class={[
            'n-pagination-item n-pagination-item--button',
            {
              'n-pagination-item--disabled':
                mergedPage < 1 || mergedPage >= compitablePageCount || disabled
            }
          ]}
          onClick={handleForwardClick}
        >
          <NBaseIcon>{{ default: () => <ForwardIcon /> }}</NBaseIcon>
        </div>
        {showSizePicker ? (
          <NSelect
            size={inputSize}
            placeholder=""
            options={pageSizeOptions}
            value={pageSize}
            disabled={disabled}
            theme={mergedTheme.peers.Select}
            themeOverrides={mergedTheme.peerOverrides.Select}
            onUpdateValue={handleSizePickerChange as any}
          />
        ) : null}
        {showQuickJumper ? (
          <div class="n-pagination-quick-jumper">
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
      </div>
    )
  }
})
