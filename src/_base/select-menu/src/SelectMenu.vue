<template>
  <div
    class="n-base-select-menu"
    :class="{
      [`n-base-select-menu--${size}-size`]: true,
      'n-base-select-menu--multiple': multiple,
      [`n-${theme}-theme`]: theme
    }"
    :style="style"
    @keyup.up.stop="handleKeyUpUp"
    @keyup.down.stop="handleKeyUpDown"
    @mousedown.prevent
  >
    <n-scrollbar
      v-if="!empty"
      ref="scrollbarRef"
      :scrollable="scrollable"
      :container="virtualScroll && virtualListContainer"
      :content="virtualScroll && virtualListContent"
      @scroll="doScroll"
    >
      <virtual-list
        v-if="virtualScroll"
        ref="virtualListRef"
        class="n-virtual-list"
        :items="tmNodes"
        :item-size="itemSize"
        :show-scrollbar="false"
        :default-scroll-index="defaultScrollIndex"
        @resize="handleVirtualListResize"
        @scroll="handleVirtualListScroll"
      >
        <template #default="{ item: tmNode }">
          <n-select-group-header
            v-if="tmNode.rawNode.type === 'group'"
            :key="tmNode.key"
            :tm-node="tmNode"
          />
          <n-select-option
            v-else
            :key="tmNode.key"
            :tm-node="tmNode"
          />
        </template>
      </virtual-list>
      <div
        v-else
        class="n-base-select-menu-option-wrapper"
      >
        <template v-for="tmNode in tmNodes">
          <n-select-group-header
            v-if="tmNode.rawNode.type === 'group'"
            :key="tmNode.key"
            :tm-node="tmNode"
          />
          <n-select-option
            v-else
            :key="tmNode.key"
            :tm-node="tmNode"
          />
        </template>
      </div>
    </n-scrollbar>
    <div
      v-else
      style="padding: 14px 0; width: 100%;"
    >
      <slot name="empty">
        <n-empty />
      </slot>
    </div>
    <div v-if="$slots.action" class="n-base-select-menu__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { VirtualList } from 'vueuc'
import { depx } from 'seemly'
import NScrollbar from '../../../scrollbar'
import NSelectOption from './SelectOption.js'
import NSelectGroupHeader from './SelectGroupHeader.js'
import NEmpty from '../../../empty'
import { formatLength } from '../../../_utils'
import { createKey } from '../../../_utils/cssr'
import { withCssr } from '../../../_mixins'
import styles from './styles'

export default {
  name: 'BaseSelectMenu',
  components: {
    VirtualList,
    NScrollbar,
    NSelectOption,
    NEmpty,
    NSelectGroupHeader
  },
  mixins: [
    withCssr(styles, {
      themeKey: 'theme',
      injectCssrProps: true
    })
  ],
  provide () {
    return {
      NBaseSelectMenu: this
    }
  },
  props: {
    theme: {
      type: String,
      default: undefined
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    treeMate: {
      type: Object,
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    pattern: {
      type: String,
      default: undefined
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    width: {
      type: [Number, String],
      default: undefined
    },
    autoPending: {
      type: Boolean,
      default: false
    },
    virtualScroll: {
      type: Boolean,
      default: true
    },
    onScroll: {
      type: Function,
      default: undefined
    },
    // deprecated
    onMenuToggleOption: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const virtualListRef = ref(null)
    const scrollbarRef = ref(null)
    const { treeMate } = props
    const pendingNodeRef = ref(
      props.autoPending
        ? props.value === null
          ? treeMate.getFirstAvailableNode()
          : props.multiple
            ? treeMate.getNode((props.value || [])[0]) || treeMate.getFirstAvailableNode()
            : treeMate.getNode(props.value) || treeMate.getFirstAvailableNode()
        : null
    )
    onMounted(() => {
      const {
        value
      } = scrollbarRef
      if (value) value.sync()
    })
    return {
      tmNodes: computed(() => props.treeMate.flattenedNodes),
      virtualListRef,
      scrollbarRef,
      virtualListContainer () {
        const {
          value
        } = virtualListRef
        return value && value.listRef
      },
      virtualListContent () {
        const {
          value
        } = virtualListRef
        return value && value.itemsRef
      },
      pendingTmNode: pendingNodeRef,
      defaultScrollIndex: pendingNodeRef.value?.fIndex
    }
  },
  computed: {
    valueSet () {
      if (
        this.multiple &&
        Array.isArray(this.value)
      ) return new Set(this.value)
      return null
    },
    empty () {
      const { tmNodes } = this
      return tmNodes && tmNodes.length === 0
    },
    itemSize () {
      return depx(this.cssrProps.$local[createKey('optionHeight', this.size)])
    },
    style () {
      return {
        width: formatLength(this.width)
      }
    }
  },
  watch: {
    treeMate (value) {
      if (this.autoPending) {
        const tmNode = this.treeMate.getFirstAvailableNode()
        this.setPendingTmNode(tmNode)
      } else {
        this.setPendingTmNode(null)
      }
    }
  },
  methods: {
    doToggleOption (option) {
      const {
        onMenuToggleOption
      } = this
      if (onMenuToggleOption) onMenuToggleOption(option)
    },
    doScroll (e) {
      const {
        onScroll
      } = this
      if (onScroll) onScroll(e)
    },
    // required, scroller sync need to be triggered manually
    handleVirtualListScroll (e) {
      this.scrollbarRef.sync()
      this.doScroll(e)
    },
    handleVirtualListResize () {
      this.scrollbarRef.sync()
    },
    getPendingOption () {
      const { pendingTmNode } = this
      return pendingTmNode && pendingTmNode.rawNode
    },
    handleOptionMouseEnter (e, tmNode) {
      if (tmNode.disabled) return
      this.setPendingTmNode(tmNode, false)
    },
    handleOptionClick (e, tmNode) {
      if (tmNode.disabled) return
      this.doToggleOption(tmNode.rawNode)
    },
    /**
     * keyboard related methods
     */
    handleKeyUpUp () {
      this.prev()
    },
    handleKeyUpDown () {
      this.next()
    },
    next () {
      const {
        pendingTmNode
      } = this
      if (pendingTmNode) {
        this.setPendingTmNode(pendingTmNode.getNext({ loop: true }), true)
      }
    },
    prev () {
      const {
        pendingTmNode
      } = this
      if (pendingTmNode) {
        this.setPendingTmNode(pendingTmNode.getPrev({ loop: true }), true)
      }
    },
    setPendingTmNode (tmNode, doScroll = false) {
      this.pendingTmNode = tmNode
      if (doScroll) {
        if (this.virtualScroll) {
          this.virtualListRef.scrollTo({ index: tmNode.fIndex })
        } else {
          this.scrollbarRef.scrollTo({ index: tmNode.fIndex, elSize: this.itemSize })
        }
      }
    }
  }
}
</script>
