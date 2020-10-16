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
        <div
          v-if="show"
          ref="bodyRef"
          v-clickoutside="handleClickOutside"
          class="n-cascader-menu"
          :class="{
            [`n-${theme}-theme`]: theme,
            [`n-cascader-menu--${size}-size`]: size
          }"
          @mousedown.capture="handleMenuMouseDown"
        >
          <!-- TODO: refactor ref -->
          <n-cascader-submenu
            v-for="(submenuOptions, index) in menuModel"
            :ref="instance => { if (instance) submenuRefs[index] = instance }"
            :key="index"
            :size="size"
            :tm-nodes="submenuOptions"
            :depth="index + 1"
          />
          <!-- <n-base-menu-mask
            ref="maskRef"
            :theme="theme"
            :duration="3000"
          /> -->
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import NBaseMenuMask from '../../_base/menu-mask'
import NCascaderSubmenu from './CascaderSubmenu.vue'
import { placeable } from '../../_mixins'
import { getPickerElement } from './utils'
import {
  zindexable,
  clickoutside
} from '../../_directives'

export default {
  name: 'NCascaderMenu',
  components: {
    NCascaderSubmenu,
    NBaseMenuMask
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
  provide () {
    return {
      NCascaderMenu: this
    }
  },
  props: {
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
    lazy: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    onLoad: {
      type: Function,
      default: () => {}
    },
    theme: {
      type: String,
      default: null
    }
  },
  setup () {
    return {
      submenuRefs: ref([]),
      maskRef: ref(null),
      trackingRef: ref(null),
      offsetContainerRef: ref(null),
      bodyRef: ref(null)
    }
  },
  computed: {
    __placeableEnabled () {
      return this.show
    }
  },
  watch: {
    menuModel () {
      this.$nextTick(() => {
        this.__placeableSyncPosition()
      })
    },
    keyboardKey (id) {
      // sync position
      // sync scroll status
    }
  },
  methods: {
    __placeableTracked () {
      return getPickerElement(this)
    },
    __placeableTracking () {
      return this.trackingRef
    },
    __placeableOffsetContainer () {
      return this.offsetContainerRef
    },
    __placeableBody () {
      return this.bodyRef
    },
    handleMenuMouseDown (e) {
      e.preventDefault()
      e.stopPropagation()
    },
    // hideMask () {
    //   if (this.maskRef) {
    //     this.maskRef.hide()
    //   }
    // },
    // updateLoadingId (id) {
    //   const { 'onUpdate:loadingId': onUpdateLoadingId } = this
    //   onUpdateLoadingId(id)
    // },
    // updateLoadingStatus (loading) {
    //   const { 'onUpdate:loading': onUpdateLoading } = this
    //   onUpdateLoading(loading)
    // },
    // loadOptionChildren (option) {
    //   if (this.lazy) {
    //     if (!option.loaded) {
    //       if (!this.loading) {
    //         this.updateLoadingStatus(true)
    //         this.updateLoadingId(option.id)
    //         this.onLoad(option, (children) => this.NCascader.resolveLoad(option, children), () => this.rejectLoad())
    //       }
    //     }
    //   }
    // },
    handleClickOutside (e) {
      this.NCascader.handleCascaderMenuClickOutside(e)
    }
  }
}
</script>
