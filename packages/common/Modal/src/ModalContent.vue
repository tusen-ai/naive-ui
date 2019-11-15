<template>
  <div
    class="n-modal-content"
    :class="{
      'n-modal-content--active': styleActive
    }"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <n-scrollbar ref="scrollbar">
      <transition
        name="n-modal-content--transition"
        @enter="handleEnter"
        @after-leave="handleAfterLeave"
        @before-leave="handleBeforeLeave"
      >
        <div
          v-if="active"
          ref="contentInner"
          style="margin: auto;"
          class="n-modal-content-slot"
        >
          <n-confirm
            v-if="preset === 'confirm'"
            ref="confirm"
            :theme="theme"
            :title="title"
            :closable="closable"
            :positive-text="positiveText"
            :negative-text="negativeText"
            :content="content"
            @close="handleCloseClick"
            @negative-click="handleNegativeClick"
            @positive-click="handlePositiveClick"
          >
            <template v-slot:header>
              <slot name="header" />
            </template>
            <template v-slot:content>
              <slot name="content" />
            </template>
            <template v-slot:footer>
              <slot name="footer" />
            </template>
          </n-confirm>
          <n-form
            v-else-if="preset === 'form'"
            :title="title"
            :closable="closable"
            @close="handleCloseClick"
          >
            <template v-slot:header>
              <slot name="header" />
            </template>
            <template v-slot:content>
              <slot name="content" />
            </template>
            <template v-slot:footer>
              <slot name="footer" />
            </template>
          </n-form>
          <slot v-else />
        </div>
      </transition>
    </n-scrollbar>
  </div>
</template>

<script>
import NScrollbar from '../../Scrollbar'
import NConfirm from 'packages/presets/Confirm'
import NForm from 'packages/presets/Form'
import themeable from '../../../mixins/themeable'

let mousePosition = null

document.documentElement.addEventListener('click', (e) => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY
  }
  window.setTimeout(() => {
    mousePosition = null
  }, 32)
}, true)

export default {
  components: {
    NScrollbar,
    NConfirm,
    NForm
  },
  mixins: [themeable],
  props: {
    active: {
      type: Boolean,
      default: false
    },
    activateEvent: {
      validator (e) {
        return e instanceof MouseEvent
      },
      default: null
    },
    preset: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'title'
    },
    closable: {
      type: Boolean,
      default: true
    },
    // For preset: confirm
    negativeText: {
      type: String,
      default: undefined
    },
    positiveText: {
      type: String,
      default: undefined
    },
    content: {
      type: String,
      default: undefined
    }
    // For preset: form
    // For preset: card
  },
  data () {
    return {
      styleActive: false
    }
  },
  created () {
    if (this.active) {
      this.styleActive = true
    }
  },
  methods: {
    slotDOM () {
      const els = (this.$refs.contentInner && this.$refs.contentInner.childNodes) || []
      return els
    },
    handleMouseDown (e) {
      this.$emit('mousedown', e)
    },
    handleMouseUp (e) {
      this.$emit('mouseup', e)
    },
    handleEnter () {
      this.styleActive = true
      this.$refs.scrollbar.enableScrollbar()
      this.$nextTick().then(() => {
        this.updateTransformOrigin()
      })
    },
    updateTransformOrigin () {
      if (
        (!this.$parent.$refs.activator ||
        !this.$parent.$refs.activator.childElementCount) &&
        !this.activateEvent &&
        !mousePosition
      ) {
        return
      }
      const scrollTop = this.$refs.scrollbar.containerScrollTop
      const {
        offsetLeft,
        offsetTop
      } = this.$refs.contentInner
      if (
        this.$parent.$refs.activator &&
        this.$parent.$refs.activator.childElementCount
      ) {
        const {
          left: activatorLeft,
          top: activatorTop,
          width: activatorWidth,
          height: activatorHeight
        } = this.$parent.$refs.activator.getBoundingClientRect()
        const transformOriginX = -(offsetLeft - activatorLeft - activatorWidth / 2)
        const transformOriginY = -(offsetTop - activatorTop - scrollTop - activatorHeight / 2)
        this.$refs.contentInner.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`
      } else if (
        this.activateEvent
      ) {
        const activatorTop = this.activateEvent.clientY
        const activatorLeft = this.activateEvent.clientX
        const activatorWidth = 0
        const activatorHeight = 0
        const transformOriginX = -(offsetLeft - activatorLeft - activatorWidth / 2)
        const transformOriginY = -(offsetTop - activatorTop - scrollTop - activatorHeight / 2)
        this.$refs.contentInner.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`
      } else if (mousePosition) {
        const activatorTop = mousePosition.y
        const activatorLeft = mousePosition.x
        const activatorWidth = 0
        const activatorHeight = 0
        const transformOriginX = -(offsetLeft - activatorLeft - activatorWidth / 2)
        const transformOriginY = -(offsetTop - activatorTop - scrollTop - activatorHeight / 2)
        this.$refs.contentInner.style.transformOrigin = `${transformOriginX}px ${transformOriginY}px`
      }
    },
    handleBeforeLeave () {
      if (this.$parent.$refs.activator &&
        this.$parent.$refs.activator.childElementCount) {
        this.updateTransformOrigin()
      }
      this.$refs.scrollbar.disableScrollbar()
      this.$emit('before-leave')
    },
    handleAfterLeave () {
      this.styleActive = false
      this.$emit('after-leave')
    },
    handleCloseClick () {
      this.$emit('close')
    },
    handleNegativeClick () {
      this.$emit('negative-click')
    },
    handlePositiveClick () {
      this.$emit('positive-click')
    }
  }
}
</script>
