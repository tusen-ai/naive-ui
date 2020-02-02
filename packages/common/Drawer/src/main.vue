<template>
  <n-base-portal ref="portal">
    <div class="n-detached-content-container" style="z-index: 1000;">
      <div
        class="n-drawer-container"
        :class="{
          'n-drawer-container--active': containerActive
        }"
      >
        <transition name="n-fade-in--transition">
          <div
            v-if="active"
            class="n-drawer-overlay"
            @click="handleOverlayClick"
          />
        </transition>
        <transition
          name="n-slide-in-from-right"
          @after-leave="handleAfterLeave"
        >
          <div
            v-if="active"
            class="n-drawer"
            :style="{
              width: styleWidth
            }"
            :class="{
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

export default {
  name: 'NDrawer',
  components: {
    NBasePortal
  },
  mixins: [withapp, themeable],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      validator (type) {
        return ['drawer', 'card'].includes(type)
      },
      default: 'drawer'
    },
    width: {
      type: Number,
      default: 251
    },
    height: {
      type: Number,
      default: null
    },
    placement: {
      validator (placement) {
        return ['top', 'right', 'bottom', 'left'].includes(placement)
      },
      default: 'right'
    },
    target: {
      type: Function,
      default: null
    },
    maskClosable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      containerActive: false
    }
  },
  computed: {
    active () {
      return this.value
    },
    styleWidth () {
      if (!this.width) return null
      return this.width + 'px'
    }
  },
  watch: {
    active (newActive) {
      if (newActive) {
        this.containerActive = true
        this.$refs.portal.transferElement()
      }
    }
  },
  mounted () {
    if (this.active) {
      this.$refs.portal.transferElement()
    }
  },
  created () {
    this.containerActive = this.active
  },
  methods: {
    handleAfterLeave () {
      this.containerActive = false
    },
    handleOverlayClick () {
      if (this.maskClosable) {
        this.$emit('input', false)
      }
    }
  }
}
</script>
