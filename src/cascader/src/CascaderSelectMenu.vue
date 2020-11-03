<template>
  <div
    ref="offsetContainerRef"
    v-zindexable="{ enabled: show }"
    class="n-positioning-container"
  >
    <div ref="trackingRef" class="n-positioning-content">
      <transition
        name="n-fade-in-scale-up-transition"
        :appear="NCascader.isMounted"
      >
        <n-base-select-menu
          v-if="show"
          ref="menuRef"
          v-clickoutside="handleClickOutside"
          class="n-cascader-menu"
          auto-pending
          :theme="theme"
          :pattern="pattern"
          :tree-mate="selectTreeMate"
          :multiple="multiple"
          :size="size"
          :value="value"
          @menu-toggle-option="handleToggleOption"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, inject, toRef } from 'vue'
import { createTreeMate } from 'treemate'
import NBaseSelectMenu from '../../_base/select-menu'
import { createSelectOptions, getPickerElement } from './utils'
import {
  placeable
} from '../../_mixins'
import {
  zindexable,
  clickoutside
} from '../../_directives'

export default {
  name: 'NCascaderSelectMenu',
  components: {
    NBaseSelectMenu
  },
  directives: {
    zindexable,
    clickoutside
  },
  mixins: [
    placeable
  ],
  inject: {
    NCascader: {
      default: null
    }
  },
  props: {
    // eslint-disable-next-line vue/require-prop-types
    placement: {
      ...placeable.props.placement,
      default: 'bottom-start'
    },
    // eslint-disable-next-line vue/require-prop-types
    widthMode: {
      ...placeable.props.widthMode,
      default: 'trigger'
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    show: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: undefined
    },
    pattern: {
      type: String,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      required: true
    },
    tmNodes: {
      type: Array,
      default: () => []
    },
    filter: {
      type: Function,
      default: (pattern, _, path) => path.some(option => option.label && ~(option.label.indexOf(pattern)))
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:value': {
      type: Function,
      required: true
    }
  },
  setup () {
    const NCascader = inject('NCascader')
    return {
      leafOnly: toRef(NCascader, 'leafOnly'),
      offsetContainerRef: ref(null),
      trackingRef: ref(null),
      menuRef: ref(null)
    }
  },
  computed: {
    __placeableEnabled () {
      return this.show
    },
    selectOptions () {
      return createSelectOptions(this.tmNodes, this.leafOnly)
    },
    filteredSelectOptions () {
      return this.selectOptions.filter(option => {
        return this.filter(this.pattern, { label: option.label, value: option.value }, option.path)
      }).map(option => ({
        value: option.value,
        label: option.label
      }))
    },
    selectTreeMate () {
      return createTreeMate(
        this.filteredSelectOptions, {
          getKey (node) {
            return node.value
          }
        }
      )
    }
  },
  watch: {
    value () {
      this.$nextTick(() => {
        this.__placeableSyncPosition()
      })
    },
    filteredSelectOptions () {
      this.$nextTick(() => {
        this.__placeableSyncPosition()
      })
    }
  },
  methods: {
    __placeableOffsetContainer () {
      return this.offsetContainerRef
    },
    __placeableTracking () {
      return this.trackingRef
    },
    __placeableTracked () {
      return getPickerElement(this)
    },
    __placeableBody () {
      return this.menuRef
    },
    handleToggleOption (option) {
      this.doCheck(option)
    },
    doCheck (option) {
      if (this.multiple) {
        const {
          NCascader: {
            value,
            doCheck,
            doUncheck
          }
        } = this
        if (value === null || !value.includes(option.value)) {
          doCheck(option.value)
        } else {
          doUncheck(option.value)
        }
      } else {
        const {
          NCascader: {
            doCheck,
            closeMenu
          }
        } = this
        doCheck(option.value)
        closeMenu()
      }
    },
    prev () {
      const { menuRef } = this
      menuRef && menuRef.prev()
    },
    next () {
      const { menuRef } = this
      menuRef && menuRef.next()
    },
    enter () {
      const { menuRef } = this
      if (menuRef) {
        const pendingOptionData = menuRef.getPendingOption()
        this.doCheck(pendingOptionData)
        return true
      }
      return false
    },
    handleClickOutside (e) {
      this.NCascader.handleSelectMenuClickOutside(e)
    }
  }
}
</script>
