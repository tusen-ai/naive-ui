<template>
  <div
    class="n-pagination"
    :class="{
      'n-pagination--transition-disabled': transitionDisabled,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme,
      'n-pagination--disabled': disabled
    }"
  >
    <div
      class="n-pagination-item n-pagination-item--backward"
      :class="{
        'n-pagination-item--disabled': page <= 1 || page > synthesizedPageCount || disabled
      }"
      @click="backward"
    >
      <div class="n-pagination-item__arrow-icon">
        <n-base-icon type="backward" />
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
        class="n-pagination-item--fast-backward"
      >
        <div class="n-pagination-item__more-icon">
          <n-base-icon type="more" />
        </div>
        <div class="n-pagination-item__arrow-icon">
          <n-base-icon type="fast-backward" />
        </div>
      </template>
      <template
        v-if="pageItem.type==='fastForward'"
        class=""
      >
        <div class="n-pagination-item__more-icon">
          <n-base-icon type="more" />
        </div>
        <div class="n-pagination-item__arrow-icon">
          <n-base-icon type="fast-forward" />
        </div>
      </template>
    </div>
    <div
      class="n-pagination-item n-pagination-item--forward"
      :class="{
        'n-pagination-item--disabled': page < 1 || page >= synthesizedPageCount || disabled
      }"
      @click="forward"
    >
      <div class="n-pagination-item__arrow-icon">
        <n-base-icon type="forward" />
      </div>
    </div>
    <div
      v-if="showQuickJumper"
      class="n-pagination-quick-jumper"
    >
      {{ localeNamespace.goto }} <n-input
        v-model="quickJumperValue"
        size="small"
        :disabled="disabled"
        @keyup="handleQuickJumperKeyUp"
      />
    </div>
    <n-select
      v-if="showSizePicker"
      size="small"
      placeholder=""
      :options="pageSizeOptions"
      :value="pageSize"
      :disabled="disabled"
      @input="handleSizePickerInput"
    />
  </div>
</template>

<script>
import { pageItems } from './utils'
import NBaseIcon from '../../../base/Icon'
import NSelect from '../../Select'
import NInput from '../../Input'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import locale from '../../../mixins/locale'

export default {
  name: 'NPagination',
  components: {
    NSelect,
    NInput,
    NBaseIcon
  },
  mixins: [ withapp, themeable, locale('Pagination') ],
  model: {
    prop: 'page',
    event: 'change'
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    total: {
      validator (value) {
        return Number.isInteger(value) && value > 0
      },
      default: undefined
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
    onPageSizeChange: {
      type: Function,
      default: null
    },
    onChange: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      quickJumperValue: '',
      transitionDisabled: false
    }
  },
  computed: {
    synthesizedPageCount () {
      if (this.total !== undefined) return this.total <= 0 ? 1 : this.total
      if (this.pageCount !== undefined) return this.pageCount <= 0 ? 1 : this.pageCount
      console.error('[naive-ui/pagination]: none of total and page-count is set')
      return 1
    },
    pageSizeOptions () {
      const suffix = this.localeNamespace.selectionSuffix
      return this.pageSizes.map(size => ({
        label: `${size} / ${suffix}`,
        value: size
      }))
    },
    pageItems () {
      return pageItems(this.page, this.synthesizedPageCount, this.pageSlot)
    }
  },
  watch: {
    page (value) {
      this.transitionDisabled = true
      this.$nextTick().then(() => {
        this.$el.getBoundingClientRect()
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
      this.$emit('change', page)
      if (typeof this.onChange === 'function') this.onChange(page)
    },
    changePageSize (pageSize) {
      if (pageSize === this.pageSize) return
      this.$emit('page-size-change', pageSize)
      if (typeof this.onPageSizeChange === 'function') this.onPageSizeChange(pageSize)
    },
    forward () {
      if (this.disabled) return
      const page = Math.min(this.page + 1, this.synthesizedPageCount)
      this.changeCurrentPage(page)
    },
    backward () {
      if (this.disabled) return
      const page = Math.max(this.page - 1, 1)
      this.changeCurrentPage(page)
    },
    fastForward () {
      if (this.disabled) return
      const page = Math.min(this.page + (this.pageSlot - 4), this.synthesizedPageCount)
      this.changeCurrentPage(page)
    },
    fastBackward () {
      if (this.disabled) return
      const page = Math.max(this.page - (this.pageSlot - 4), 1)
      this.changeCurrentPage(page)
    },
    handleSizePickerInput (value) {
      this.changePageSize(value)
    },
    handleQuickJumperKeyUp (e) {
      if (e.code === 'Enter') {
        const page = parseInt(this.quickJumperValue)
        if (!Number.isNaN(page) && page >= 1 && page <= this.synthesizedPageCount) {
          this.changeCurrentPage(page)
          this.quickJumperValue = ''
        }
      }
    }
  }
}
</script>
