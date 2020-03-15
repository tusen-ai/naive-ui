<template>
  <n-base-portal ref="portal" :transfer-target="target">
    <div
      ref="contentContainer"
      class="n-positioning-container"
      :class="{
        'n-positioning-container--absolute': target
      }"
    >
      <div
        class="n-drawer-container"
      >
        <transition name="n-drawer-overlay-transition">
          <div
            v-if="active"
            class="n-drawer-overlay"
            @click="handleOverlayClick"
          />
        </transition>
        <transition
          :name="transitionName"
          @after-leave="handleAfterLeave"
        >
          <n-drawer-content
            v-if="active"
            class="n-drawer"
            :style="{
              ...drawerStyle,
              width: styleWidth,
              height: styleHeight
            }"
            :class="{
              [`n-drawer--${placement}-placement`]: true,
              [`n-${syntheticTheme}-theme`]: syntheticTheme
            }"
          >
            <slot />
          </n-drawer-content>
        </transition>
      </div>
    </div>
  </n-base-portal>
</template>

<script>
import NBasePortal from '../../_base/Portal'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import zindexable from '../../_mixins/zindexable'
import formatLength from '../../_utils/css/formatLength'
import NDrawerContent from './DrawerContent'

export default {
  name: 'NDrawer',
  components: {
    NBasePortal,
    NDrawerContent
  },
  mixins: [withapp, themeable, zindexable],
  model: {
    prop: 'show',
    event: 'hide'
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
    drawerStyle: {
      type: Object,
      default: null
    },
    /** Todo */
    target: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      zindexable: true,
      parent: null
    }
  },
  computed: {
    transitionName () {
      return ({
        right: 'n-slide-in-from-right-transition',
        left: 'n-slide-in-from-left-transition',
        top: 'n-slide-in-from-top-transition',
        bottom: 'n-slide-in-from-bottom-transition'
      })[this.placement]
    },
    active () {
      return this.show
    },
    styleWidth () {
      if (this.placement === 'top' || this.placement === 'bottom') return null
      if (this.width === null) return null
      return formatLength(this.width)
    },
    styleHeight () {
      if (this.placement === 'left' || this.placement === 'right') return null
      if (this.height === null) return null
      return formatLength(this.height)
    }
  },
  watch: {
    active (value) {
      if (value) {
        this.$emit('show')
        this.$refs.portal.transferElement()
      }
    }
  },
  mounted () {
    if (this.active) {
      this.$refs.portal.transferElement()
    }
  },
  methods: {
    handleAfterLeave () {
    },
    handleOverlayClick () {
      if (this.maskClosable) {
        this.$emit('hide', false)
      }
    }
  }
}
</script>
