<template>
  <div
    ref="selfRef"
    class="n-pagination"
    :class="{
      'n-pagination--transition-disabled': transitionDisabled,
      'n-pagination--disabled': disabled
    }"
    :style="cssVars"
  >
    <div
      class="n-pagination-item n-pagination-item--button"
      :class="{
        'n-pagination-item--disabled':
          page <= 1 || page > compitablePageCount || disabled
      }"
      @click="handleBackwardClick"
    >
      <n-icon>
        <backward-icon />
      </n-icon>
    </div>
    <div
      v-for="(pageItem, index) in pageItems"
      :key="index"
      class="n-pagination-item"
      :class="{
        'n-pagination-item--active': pageItem.active,
        'n-pagination-item--disabled': disabled
      }"
      @click="handlePageItemClick(pageItem)"
      @mouseenter="handlePageItemMouseEnter(pageItem)"
      @mouseleave="handlePageItemMouseLeave(pageItem)"
    >
      <template v-if="pageItem.type === 'page'">
        {{ pageItem.label }}
      </template>
      <template v-if="pageItem.type === 'fastBackward'">
        <n-icon v-if="showFastBackward">
          <fast-backward-icon />
        </n-icon>
        <n-icon v-else>
          <more-icon />
        </n-icon>
      </template>
      <template v-if="pageItem.type === 'fastForward'">
        <n-icon v-if="showFastForward">
          <fast-forward-icon />
        </n-icon>
        <n-icon v-else>
          <more-icon />
        </n-icon>
      </template>
    </div>
    <div
      class="n-pagination-item n-pagination-item--button"
      :class="{
        'n-pagination-item--disabled':
          page < 1 || page >= compitablePageCount || disabled
      }"
      @click="handleForwardClick"
    >
      <n-icon>
        <forward-icon />
      </n-icon>
    </div>
    <n-select
      v-if="showSizePicker"
      :size="inputSize"
      placeholder=""
      :options="pageSizeOptions"
      :value="pageSize"
      :disabled="disabled"
      @update:value="handleSizePickerChange"
    />
    <div v-if="showQuickJumper" class="n-pagination-quick-jumper">
      {{ locale.goto }}
      <n-input
        v-model:value="jumperValue"
        :size="inputSize"
        placeholder=""
        :disabled="disabled"
        @keyup="handleQuickJumperKeyUp"
      />
    </div>
  </div>
</template>

<script>
import { nextTick, computed, ref, toRef, watch } from 'vue'
import { useCompitable, useMergedState } from 'vooks'
import { NSelect } from '../../select'
import { NInput } from '../../input'
import { NIcon } from '../../icon'
import {
  FastForwardIcon,
  FastBackwardIcon,
  BackwardIcon,
  ForwardIcon,
  MoreIcon
} from '../../_base/icons'
import { useLocale, useTheme } from '../../_mixins'
import { paginationLight } from '../styles'
import { pageItems } from './utils'
import style from './styles/index.cssr.js'

function useMethods (
  props,
  {
    showFastForwardRef,
    showFastBackwardRef,
    mergedPageRef,
    mergedPageSizeRef,
    compitablePageCountRef,
    jumperValueRef,
    disableTransitionOneTick
  }
) {
  function doUpdatePage (page) {
    if (page === mergedPageRef.value) return
    const { 'onUpdate:page': onUpdatePage, onChange } = props
    if (onUpdatePage) onUpdatePage(page)
    // deprecated
    if (onChange) onChange(page)
  }
  function doUpdatePageSize (pageSize) {
    if (pageSize === mergedPageSizeRef.value) return
    const { 'onUpdate:pageSize': onUpdatePageSize, onPageSizeChange } = this
    if (onUpdatePageSize) onUpdatePageSize(pageSize)
    // deprecated
    if (onPageSizeChange) onPageSizeChange(pageSize)
  }
  function forward () {
    if (props.disabled) return
    const page = Math.min(mergedPageRef.value + 1, compitablePageCountRef.value)
    doUpdatePage(page)
  }
  function backward () {
    if (props.disabled) return
    const page = Math.max(mergedPageRef.value - 1, 1)
    doUpdatePage(page)
  }
  function fastForward () {
    if (props.disabled) return
    const page = Math.min(
      mergedPageRef.value + (props.pageSlot - 4),
      compitablePageCountRef.value
    )
    doUpdatePage(page)
  }
  function fastBackward () {
    if (props.disabled) return
    const page = Math.max(mergedPageRef.value - (props.pageSlot - 4), 1)
    doUpdatePage(page)
  }
  function handleSizePickerChange (value) {
    doUpdatePageSize(value)
  }
  function handleQuickJumperKeyUp (e) {
    if (e.code === 'Enter') {
      const page = parseInt(jumperValueRef.value)
      if (
        !Number.isNaN(page) &&
        page >= 1 &&
        page <= compitablePageCountRef.value
      ) {
        doUpdatePage(page)
        jumperValueRef.value = ''
      }
    }
  }
  function handlePageItemClick (pageItem) {
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
  function handlePageItemMouseEnter (pageItem) {
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
  function handlePageItemMouseLeave (pageItem) {
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
  return {
    handleBackwardClick: backward,
    handleForwardClick: forward,
    handlePageItemClick,
    handleSizePickerChange,
    handleQuickJumperKeyUp,
    handlePageItemMouseEnter,
    handlePageItemMouseLeave
  }
}

export default {
  name: 'Pagination',
  components: {
    NSelect,
    NInput,
    NIcon,
    BackwardIcon,
    ForwardIcon,
    MoreIcon,
    FastForwardIcon,
    FastBackwardIcon
  },
  props: {
    ...useTheme.props,
    page: {
      type: Number,
      required: true
    },
    pageCount: {
      validator (value) {
        return Number.isInteger(value) && value > 0
      },
      default: undefined
    },
    defaultPageCount: {
      validator (value) {
        return Number.isInteger(value) && value > 0
      },
      default: 1
    },
    showSizePicker: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: undefined
    },
    defaultPageSize: {
      type: Number,
      default: null
    },
    pageSizes: {
      type: Array,
      default: () => []
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
    'onUpdate:page': {
      type: Function,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:pageSize': {
      type: Function,
      default: undefined
    },
    // deprecated
    onPageSizeChange: {
      type: Function,
      default: undefined
    },
    onChange: {
      type: Function,
      default: undefined
    },
    total: {
      validator (value) {
        return Number.isInteger(value) && value > 0
      },
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme(
      'Pagination',
      'Pagination',
      style,
      paginationLight,
      props
    )
    const selfRef = ref(null)
    const compitablePageCountRef = useCompitable(props, ['total', 'pageCount'])
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
    const disableTransitionOneTick = () => {
      transitionDisabledRef.value = true
      nextTick(() => {
        void selfRef.value.offsetWidth
        transitionDisabledRef.value = false
      })
    }
    watch(mergedPageRef, disableTransitionOneTick)
    return {
      ...useLocale('Pagination'),
      ...useMethods(props, {
        showFastForwardRef,
        showFastBackwardRef,
        mergedPageRef,
        mergedPageSizeRef,
        compitablePageCountRef,
        jumperValueRef,
        disableTransitionOneTick
      }),
      selfRef,
      showFastBackward: showFastBackwardRef,
      showFastForward: showFastForwardRef,
      compitablePageCount: compitablePageCountRef,
      pageItems: computed(() =>
        pageItems(props.page, compitablePageCountRef.value, props.pageSlot)
      ),
      jumperValue: jumperValueRef,
      transitionDisabled: transitionDisabledRef,
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
  computed: {
    pageSizeOptions () {
      const suffix = this.locale.selectionSuffix
      return this.pageSizes.map((size) => ({
        label: `${size} / ${suffix}`,
        value: size
      }))
    },
    // unstable feature
    inputSize () {
      const { unstableConfig } = this.$naive
      const size = unstableConfig?.Pagination?.inputSize
      if (size) {
        return size
      }
      return 'small'
    }
  }
}
</script>
