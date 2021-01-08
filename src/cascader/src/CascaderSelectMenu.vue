<template>
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
      :unstable-theme-overrides="NCascader.theme.peers.BaseSelectMenu"
      :unstable-theme="NCascader.theme.overrides.BaseSelectMenu"
      :pattern="pattern"
      :tree-mate="selectTreeMate"
      :multiple="multiple"
      :size="size"
      :value="value"
      @menu-toggle-option="handleToggleOption"
    />
  </transition>
</template>

<script>
import { ref, inject, toRef, defineComponent } from 'vue'
import { clickoutside } from 'vdirs'
import { createTreeMate } from 'treemate'
import { NBaseSelectMenu } from '../../_base'
import { createSelectOptions } from './utils'

export default defineComponent({
  name: 'NCascaderSelectMenu',
  components: {
    NBaseSelectMenu
  },
  directives: {
    clickoutside
  },
  inject: ['NCascader'],
  props: {
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
      default: (pattern, _, path) =>
        path.some((option) => option.label && ~option.label.indexOf(pattern))
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
      NCascader,
      leafOnly: toRef(NCascader, 'leafOnly'),
      menuRef: ref(null)
    }
  },
  computed: {
    selectOptions () {
      return createSelectOptions(this.tmNodes, this.leafOnly)
    },
    filteredSelectOptions () {
      return this.selectOptions
        .filter((option) => {
          return this.filter(
            this.pattern,
            { label: option.label, value: option.value },
            option.path
          )
        })
        .map((option) => ({
          value: option.value,
          label: option.label
        }))
    },
    selectTreeMate () {
      return createTreeMate(this.filteredSelectOptions, {
        getKey (node) {
          return node.value
        }
      })
    }
  },
  watch: {
    value () {
      this.$nextTick(() => {
        this.NCascader.syncSelectMenuPosition()
      })
    },
    filteredSelectOptions () {
      this.$nextTick(() => {
        this.NCascader.syncSelectMenuPosition()
      })
    }
  },
  methods: {
    handleToggleOption (option) {
      this.doCheck(option)
    },
    doCheck (option) {
      if (this.multiple) {
        const {
          NCascader: { mergedValue, doCheck, doUncheck }
        } = this
        if (mergedValue === null || !mergedValue.includes(option.value)) {
          doCheck(option.value)
        } else {
          doUncheck(option.value)
        }
      } else {
        const {
          NCascader: { doCheck, closeMenu }
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
})
</script>
