<template>
  <n-lazy-teleport
    :to="to"
    :show="show"
  >
    <div
      v-zindexable="{ enabled: show }"
      class="n-positioning-container"
      :class="{
        [namespace]: namespace
      }"
    >
      <transition
        name="n-fade-in-transition"
        :appear="isMounted"
      >
        <div
          v-if="show"
          class="n-drawer-mask"
          @click="handleMaskClick"
        />
      </transition>
      <n-drawer-body-wrapper
        :placement="placement"
        :body-wrapper-class="bodyWrapperClass"
        :body-wrapper-style="mergedBodyWrapperStyle"
        :body-style="compitableBodyStyle"
        :body-class="compitableBodyClass"
        :show="show"
        :display-directive="displayDirective"
        :theme="mergedTheme"
      >
        <slot />
      </n-drawer-body-wrapper>
    </div>
  </n-lazy-teleport>
</template>

<script>
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import { zindexable } from '../../_directives'
import formatLength from '../../_utils/css/formatLength'
import { warn } from '../../_utils/naive/warn'
import { useCompitable, useIsMounted } from '../../_utils/composition'
import NLazyTeleport from '../../_base/lazy-teleport'
import NDrawerBodyWrapper from './DrawerBodyWrapper.vue'
import styles from './styles/index'

export default {
  name: 'Drawer',
  components: {
    NLazyTeleport,
    NDrawerBodyWrapper
  },
  directives: {
    zindexable
  },
  mixins: [
    configurable,
    themeable,
    usecssr(styles)
  ],
  provide () {
    return {
      NDrawer: this,
      NModal: null
    }
  },
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
    bodyClass: {
      type: String,
      default: undefined
    },
    bodyStyle: {
      type: Object,
      default: undefined
    },
    bodyWrapperClass: {
      type: String,
      default: undefined
    },
    bodyWrapperStyle: {
      type: Object,
      default: undefined
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
    // eslint-disable-next-line vue/prop-name-casing
    'onUpdate:show': {
      type: Function,
      default: undefined
    },
    // deprecated
    drawerStyle: {
      validator () {
        warn('drawer', '`draw-style` is deprecated, please use `body-style` instead.')
        return true
      },
      default: undefined
    },
    drawerClass: {
      validator () {
        warn('drawer', '`draw-class` is deprecated, please use `body-class` instead.')
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
        warn('drawer', '`on-show` is deprecated, please use `on-update:show` instead.')
        return true
      },
      default: undefined
    },
    onHide: {
      validator () {
        warn('drawer', '`on-hide` is deprecated, please use `on-update:show` instead.')
        return true
      },
      default: undefined
    }
  },
  setup (props) {
    return {
      compitableBodyClass: useCompitable(props, ['drawerClass', 'bodyClass']),
      compitableBodyStyle: useCompitable(props, ['drawerStyle', 'bodyStyle']),
      isMounted: useIsMounted()
    }
  },
  computed: {
    styleWidth () {
      const {
        placement
      } = this
      if (placement === 'top' || placement === 'bottom') return null
      const {
        width
      } = this
      if (width === null) return null
      return formatLength(width)
    },
    styleHeight () {
      const {
        placement
      } = this
      if (placement === 'left' || placement === 'right') return null
      const {
        height
      } = this
      if (height === null) return null
      return formatLength(height)
    },
    mergedBodyWrapperStyle () {
      return {
        width: this.styleWidth,
        height: this.styleHeight,
        ...this.bodyWrapperStyle
      }
    }
  },
  methods: {
    handleMaskClick () {
      if (this.maskClosable) {
        const {
          onHide,
          'onUpdate:show': onUpdateShow
        } = this
        if (onUpdateShow) onUpdateShow(false)
        // deprecated
        if (onHide) onHide()
      }
    }
  }
}
</script>
