<template>
  <transition
    name="n-fade-in-scale-up-transition"
    :appear="NCascader.isMounted"
  >
    <div
      v-if="show"
      v-clickoutside="handleClickOutside"
      class="n-cascader-menu"
      @mousedown.capture="handleMenuMouseDown"
    >
      <!-- TODO: refactor ref -->
      <n-cascader-submenu
        v-for="(submenuOptions, index) in menuModel"
        :ref="
          (instance) => {
            if (instance) submenuRefs[index] = instance
          }
        "
        :key="index"
        :size="size"
        :tm-nodes="submenuOptions"
        :depth="index + 1"
      />
      <n-base-menu-mask ref="maskRef" />
    </div>
  </transition>
</template>
<script>
import { ref, defineComponent } from 'vue'
import { clickoutside } from 'vdirs'
import { NBaseMenuMask } from '../../_base'
import NCascaderSubmenu from './CascaderSubmenu.vue'

export default defineComponent({
  name: 'NCascaderMenu',
  components: {
    NCascaderSubmenu,
    NBaseMenuMask
  },
  directives: {
    clickoutside
  },
  inject: ['NCascader'],
  provide () {
    return {
      NCascaderMenu: this
    }
  },
  props: {
    value: {
      validator () {
        return true
      },
      default: undefined
    },
    theme: {
      type: String,
      default: undefined
    },
    placement: {
      type: String,
      default: 'bottom-start'
    },
    show: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    menuModel: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    return {
      submenuRefs: ref([]),
      maskRef: ref(null)
    }
  },
  watch: {
    value () {
      this.$nextTick(() => {
        this.NCascader.syncCascaderMenuPosition()
      })
    },
    menuModel () {
      this.$nextTick(() => {
        this.NCascader.syncCascaderMenuPosition()
      })
    }
  },
  methods: {
    handleMenuMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    showErrorMessage (label) {
      const {
        NCascader: {
          locale: { loadingRequiredMessage }
        },
        maskRef
      } = this
      if (maskRef) {
        maskRef.showOnce(loadingRequiredMessage(label))
      }
    },
    handleClickOutside (e) {
      this.NCascader.handleCascaderMenuClickOutside(e)
    }
  }
})
</script>
