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
        'n-pagination-item--disabled': page <= 1 || page > safePageCount || disabled
      }"
      @click="backward"
    >
      <icon type="backward" />
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
        <icon type="more" />
        <icon type="fastBackward" />
      </template>
      <template
        v-if="pageItem.type==='fastForward'"
        class=""
      >
        <icon type="more" />
        <icon type="fastForward" />
      </template>
    </div>
    <div
      class="n-pagination-item n-pagination-item--forward"
      :class="{
        'n-pagination-item--disabled': page < 1 || page >= safePageCount || disabled
      }"
      @click="forward"
    >
      <icon type="forward" />
    </div>
    <div
      v-if="showQuickJumper"
      class="n-pagination-quick-jumper"
    >
      Goto <n-input
        v-model="quickJumperValue"
        size="small"
        :disabled="disabled"
        @keyup="handleQuickJumperKeyUp"
      />
    </div>
    <n-select
      v-if="showSizePicker"
      size="small"
      placeholder="Select Page Size"
      :options="sizeOptions"
      :value="pageSize"
      :disabled="disabled"
      @input="handleSizePickerInput"
    />
  </div>
</template>

<script>
import { pageItems } from './utils'
import Icon from './Icon'
import NSelect from '../../Select'
import NInput from '../../Input'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NPagination',
  components: {
    NSelect,
    NInput,
    Icon
  },
  mixins: [withapp, themeable],
  model: {
    prop: 'page',
    event: 'input'
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    pageCount: {
      validator (value) {
        return Number.isInteger(value) && value > 0
      },
      required: true
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
    }
  },
  data () {
    return {
      quickJumperValue: '',
      transitionDisabled: false
    }
  },
  computed: {
    safePageCount () {
      return this.pageCount <= 0 ? 1 : this.pageCount
    },
    sizeOptions () {
      return this.pageSizes.map(size => ({
        label: `${size} / page`,
        value: size
      }))
    },
    pageItems () {
      return pageItems(this.page, this.safePageCount, this.pageSlot)
    }
  },
  watch: {
    page () {
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
          this.setCurrentPage(pageItem.label)
          break
        case 'fastBackward':
          this.fastBackward()
          break
        case 'fastForward':
          this.fastForward()
          break
      }
    },
    setCurrentPage (page) {
      if (this.disabled) return
      this.$emit('input', page)
    },
    forward () {
      if (this.disabled) return
      const page = Math.min(this.page + 1, this.safePageCount)
      this.$emit('input', page)
    },
    backward () {
      if (this.disabled) return
      const page = Math.max(this.page - 1, 1)
      this.$emit('input', page)
    },
    fastForward () {
      if (this.disabled) return
      const page = Math.min(this.page + (this.pageSlot - 4), this.safePageCount)
      this.$emit('input', page)
    },
    fastBackward () {
      if (this.disabled) return
      const page = Math.max(this.page - (this.pageSlot - 4), 1)
      this.$emit('input', page)
    },
    handleSizePickerInput (value) {
      this.$emit('page-size-change', value)
      this.$emit('update:pageSize', value)
    },
    handleQuickJumperKeyUp (e) {
      if (e.code === 'Enter') {
        const page = parseInt(this.quickJumperValue)
        if (!Number.isNaN(page) && page >= 1 && page <= this.safePageCount) {
          this.$emit('input', page)
          this.quickJumperValue = ''
        }
      }
    }
  }
}
</script>
