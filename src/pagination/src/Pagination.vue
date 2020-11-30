<template>
  <div
    class="n-pagination"
    :class="{
      'n-pagination--transition-disabled': transitionDisabled,
      [`n-${mergedTheme}-theme`]: mergedTheme,
      'n-pagination--disabled': disabled
    }"
  >
    <div
      class="n-pagination-item n-pagination-item--backward"
      :class="{
        'n-pagination-item--disabled': page <= 1 || page > compitablePageCount || disabled
      }"
      @click="backward"
    >
      <div class="n-pagination-item__arrow-icon">
        <backward-icon />
      </div>
    </div>
    <div
      v-for="pageItem in pageItems"
      :key="pageItem.label"
      class="n-pagination-item"
      :class="{
        'n-pagination-item--active': pageItem.active,
        'n-pagination-item--fast-backward': pageItem.type==='fastBackward',
        'n-pagination-item--fast-forward': pageItem.type==='fastForward',
        'n-pagination-item--disabled': disabled
      }"
      @click="dispatchPageChangeAction(pageItem)"
    >
      <template
        v-if="pageItem.type==='page'"
      >
        {{ pageItem.label }}
      </template>
      <template
        v-if="pageItem.type==='fastBackward'"
      >
        <div class="n-pagination-item__more-icon">
          <more-icon />
        </div>
        <div class="n-pagination-item__arrow-icon">
          <fast-backward-icon />
        </div>
      </template>
      <template
        v-if="pageItem.type==='fastForward'"
      >
        <div class="n-pagination-item__more-icon">
          <more-icon />
        </div>
        <div class="n-pagination-item__arrow-icon">
          <fast-forward-icon />
        </div>
      </template>
    </div>
    <div
      class="n-pagination-item n-pagination-item--forward"
      :class="{
        'n-pagination-item--disabled': page < 1 || page >= compitablePageCount || disabled
      }"
      @click="forward"
    >
      <div class="n-pagination-item__arrow-icon">
        <forward-icon />
      </div>
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
    <div
      v-if="showQuickJumper"
      class="n-pagination-quick-jumper"
    >
      {{ localeNs.goto }} <n-input
        v-model:value="quickJumperValue"
        :size="inputSize"
        placeholder=""
        :disabled="disabled"
        @keyup="handleQuickJumperKeyUp"
      />
    </div>
  </div>
</template>

<script>
import { nextTick, computed } from 'vue'
import NSelect from '../../select'
import NInput from '../../input'
import {
  FastForwardIcon,
  FastBackwardIcon,
  BackwardIcon,
  ForwardIcon,
  MoreIcon
} from '../../_base/icons'
import {
  configurable,
  themeable,
  locale,
  withCssr
} from '../../_mixins'
import { pageItems } from './utils'
import styles from './styles'
import { useCompitable } from 'vooks'

export default {
  name: 'Pagination',
  components: {
    NSelect,
    NInput,
    BackwardIcon,
    ForwardIcon,
    MoreIcon,
    FastForwardIcon,
    FastBackwardIcon
  },
  mixins: [
    configurable,
    themeable,
    withCssr(styles),
    locale('Pagination')
  ],
  props: {
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
    showSizePicker: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: undefined
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
    const compitablePageCountRef = useCompitable(props, ['total', 'pageCount'])
    return {
      compitablePageCount: compitablePageCountRef,
      pageItems: computed(() =>
        pageItems(props.page, compitablePageCountRef.value, props.pageSlot)
      )
    }
  },
  data () {
    return {
      quickJumperValue: '',
      transitionDisabled: false
    }
  },
  computed: {
    pageSizeOptions () {
      const suffix = this.localeNs.selectionSuffix
      return this.pageSizes.map(size => ({
        label: `${size} / ${suffix}`,
        value: size
      }))
    },
    // unstable feature
    inputSize () {
      const {
        unstableConfig
      } = this.$naive
      const size = unstableConfig?.Pagination?.inputSize
      if (size) {
        return size
      }
      return 'small'
    }
  },
  watch: {
    page (value) {
      this.transitionDisabled = true
      nextTick(() => {
        void this.$el.offsetWidth
        this.transitionDisabled = false
      })
    }
  },
  methods: {
    dispatchPageChangeAction (pageItem) {
      if (this.disabled) return
      switch (pageItem.type) {
        case 'page':
          this.changeCurrentPage(pageItem.label)
          break
        case 'fastBackward':
          this.fastBackward()
          break
        case 'fastForward':
          this.fastForward()
          break
      }
    },
    changeCurrentPage (page) {
      if (page === this.page) return
      const {
        'onUpdate:page': onUpdatePage,
        onPageSizeChange
      } = this
      if (onUpdatePage) this['onUpdate:page'](page)
      // deprecated
      if (onPageSizeChange) this.onChange(page)
    },
    changePageSize (pageSize) {
      if (pageSize === this.pageSize) return
      const {
        'onUpdate:pageSize': onUpdatePageSize,
        onPageSizeChange
      } = this
      if (onUpdatePageSize) this['onUpdate:pageSize'](pageSize)
      // deprecated
      if (onPageSizeChange) this.onPageSizeChange(pageSize)
    },
    forward () {
      if (this.disabled) return
      const page = Math.min(this.page + 1, this.compitablePageCount)
      this.changeCurrentPage(page)
    },
    backward () {
      if (this.disabled) return
      const page = Math.max(this.page - 1, 1)
      this.changeCurrentPage(page)
    },
    fastForward () {
      if (this.disabled) return
      const page = Math.min(this.page + (this.pageSlot - 4), this.compitablePageCount)
      this.changeCurrentPage(page)
    },
    fastBackward () {
      if (this.disabled) return
      const page = Math.max(this.page - (this.pageSlot - 4), 1)
      this.changeCurrentPage(page)
    },
    handleSizePickerChange (value) {
      this.changePageSize(value)
    },
    handleQuickJumperKeyUp (e) {
      if (e.code === 'Enter') {
        const page = parseInt(this.quickJumperValue)
        if (!Number.isNaN(page) && page >= 1 && page <= this.compitablePageCount) {
          this.changeCurrentPage(page)
          this.quickJumperValue = ''
        }
      }
    }
  }
}
</script>
