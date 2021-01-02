<template>
  <v-lazy-teleport :to="to" :show="show">
    <div
      v-zindexable="{ enabled: show }"
      class="n-positioning-container"
      :class="{
        [namespace]: namespace
      }"
      :style="cssVars"
    >
      <transition name="n-fade-in-transition" :appear="isMounted">
        <div v-if="show" class="n-drawer-mask" @click="handleMaskClick" />
      </transition>
      <n-drawer-body-wrapper
        v-bind="$attrs"
        :class="drawerClass"
        :style="mergedBodyStyle"
        :placement="placement"
        :scrollbar-props="scrollbarProps"
        :show="show"
        :display-directive="displayDirective"
        :native-scrollbar="nativeScrollbar"
      >
        <slot />
      </n-drawer-body-wrapper>
    </div>
  </v-lazy-teleport>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { VLazyTeleport } from 'vueuc'
import { zindexable } from 'vdirs'
import { useIsMounted } from 'vooks'
import { useTheme, useConfig } from '../../_mixins'
import { warn, formatLength } from '../../_utils'
import { drawerLight } from '../styles'
import NDrawerBodyWrapper from './DrawerBodyWrapper.vue'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Drawer',
  components: {
    VLazyTeleport,
    NDrawerBodyWrapper
  },
  directives: {
    zindexable
  },
  provide () {
    return {
      NDrawer: this,
      NModal: null
    }
  },
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 251
    },
    height: {
      type: [Number, String],
      default: 251
    },
    placement: {
      validator (placement) {
        return ['top', 'right', 'bottom', 'left'].includes(placement)
      },
      default: 'right'
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    displayDirective: {
      validator (value) {
        return ['if', 'show'].includes(value)
      },
      default: 'if'
    },
    nativeScrollbar: {
      type: Boolean,
      default: true
    },
    scrollbarProps: {
      type: Object,
      default: undefined
    },
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:show': {
      type: Function,
      default: undefined
    },
    // deprecated
    drawerStyle: {
      validator () {
        warn(
          'drawer',
          '`drawer-style` is deprecated, please use `style` instead.'
        )
        return true
      },
      default: undefined
    },
    drawerClass: {
      validator () {
        warn(
          'drawer',
          '`drawer-class` is deprecated, please use `class` instead.'
        )
        return true
      },
      default: undefined
    },
    target: {
      validator () {
        warn('drawer', '`target` is deprecated, please use `to` instead.')
        return true
      },
      default: undefined
    },
    onShow: {
      validator () {
        warn(
          'drawer',
          '`on-show` is deprecated, please use `on-update:show` instead.'
        )
        return true
      },
      default: undefined
    },
    onHide: {
      validator () {
        warn(
          'drawer',
          '`on-hide` is deprecated, please use `on-update:show` instead.'
        )
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Drawer', 'Drawer', style, drawerLight, props)
    return {
      ...useConfig(props),
      cssVars: computed(() => {
        const {
          common: {
            cubicBezierEaseInOut,
            cubicBezierEaseIn,
            cubicBezierEaseOut
          },
          self: { color, textColor, boxShadow, lineHeight }
        } = themeRef.value
        return {
          '--line-height': lineHeight,
          '--color': color,
          '--text-color': textColor,
          '--box-shadow': boxShadow,
          '--bezier': cubicBezierEaseInOut,
          '--bezier-out': cubicBezierEaseOut,
          '--bezier-in': cubicBezierEaseIn
        }
      }),
      isMounted: useIsMounted()
    }
  },
  computed: {
    styleWidth () {
      const { placement } = this
      if (placement === 'top' || placement === 'bottom') return null
      const { width } = this
      if (width === null) return null
      return formatLength(width)
    },
    styleHeight () {
      const { placement } = this
      if (placement === 'left' || placement === 'right') return null
      const { height } = this
      if (height === null) return null
      return formatLength(height)
    },
    mergedBodyStyle () {
      return {
        width: this.styleWidth,
        height: this.styleHeight,
        ...this.drawerStyle
      }
    }
  },
  methods: {
    handleMaskClick () {
      if (this.maskClosable) {
        const { onHide, 'onUpdate:show': onUpdateShow } = this
        if (onUpdateShow) onUpdateShow(false)
        // deprecated
        if (onHide) onHide()
      }
    }
  }
})
</script>
