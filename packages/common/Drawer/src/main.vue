<template>
  <n-base-portal ref="portal">
    <div ref="contentContainer" class="n-positioning-container">
      <div
        class="n-drawer-container"
      >
        <transition name="n-fade-in--transition">
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
          <div
            v-if="active"
            class="n-drawer"
            :style="{
              ...drawerStyle,
              width: styleWidth,
              height: styleHeight
            }"
            :class="{
              [`n-drawer--${placement}-placement`]: true,
              [`n-${synthesizedTheme}-theme`]: synthesizedTheme
            }"
          >
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </n-base-portal>
</template>

<script>
import NBasePortal from '../../../base/Portal'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import zindexable from '../../../mixins/zindexable'

export default {
  name: 'NDrawer',
  components: {
    NBasePortal
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
      type: Number,
      default: 251
    },
    height: {
      type: Number,
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
      default: null
    }
  },
  data () {
    return {
      detached: true
    }
  },
  computed: {
    transitionName () {
      return ({
        right: 'n-slide-in-from-right',
        left: 'n-slide-in-from-left',
        top: 'n-slide-in-from-top',
        bottom: 'n-slide-in-from-bottom'
      })[this.placement]
    },
    active () {
      return this.show
    },
    styleWidth () {
      if (this.placement === 'top' || this.placement === 'bottom') return null
      if (this.width === null) return null
      return this.width + 'px'
    },
    styleHeight () {
      if (this.placement === 'left' || this.placement === 'right') return null
      if (this.height === null) return null
      return this.height + 'px'
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
