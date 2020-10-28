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
      :container="virtualListContainer"
      :content="virtualListContent"
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
        @resize="handleListResize"
        @scroll="handleListScroll"
      >
        <template v-slot="{ item: tmNode }">
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
import NScrollbar from '../../../scrollbar'
import NSelectOption from './SelectOption.js'
import NSelectGroupHeader from './SelectGroupHeader.js'
import NEmpty from '../../../empty'
import { depx, formatLength } from '../../../_utils/css'
import { createKey } from '../../../_utils/cssr'
import { usecssr } from '../../../_mixins'
import styles from './styles'

export default {
  name: 'BaseSelectMenu',
  provide () {
    return {
      NBaseSelectMenu: this
    }
  },
  components: {
    VirtualList,
    NScrollbar,
    NSelectOption,
    NEmpty,
    NSelectGroupHeader
  },
  mixins: [
    usecssr(styles, {
      themeKey: 'theme',
      injectCssrProps: true
    })
  ],
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
    autoPendingFirstOption: {
      type: Boolean,
      default: false
    },
    virtualScroll: {
      type: Boolean,
      default: true
    },
    // deprecated
    onMenuToggleOption: {
      type: Function,
      default: undefined
    },
    onMenuScroll: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const virtualListRef = ref(null)
    const scrollbarRef = ref(null)
    const pendingNodeRef = ref(
      props.autoPendingFirstOption
        ? props.treeMate.getFirstAvailableNode()
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
      if (this.autoPendingFirstOption) {
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
        onMenuScroll
      } = this
      if (onMenuScroll) onMenuScroll(e)
    },
    // required, scroller sync need to be triggered manually
    handleListScroll () {
      this.scrollbarRef.sync()
    },
    handleListResize () {
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
      if (tmNode !== null) this.pendingTmNode = tmNode
      if (doScroll && this.virtualScroll) {
        const {
          virtualListRef
        } = this
        virtualListRef.scrollTo({ index: tmNode.fIndex })
      }
    }
  }
}
</script>
