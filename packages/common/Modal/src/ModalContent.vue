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
            v-if="preset==='confirm'"
            ref="confirm"
            :title="title"
            :closable="closable"
            :cancel-text="cancelText"
            :submit-text="submitText"
            :content="content"
            @deactivate="deactivate"
            @cancel="cancel"
            @submit="submit"
          >
            <slot slot="header" name="header" />
            <slot slot="content" name="content" />
            <slot slot="footer" name="footer" />
          </n-confirm>
          <n-form
            v-else-if="preset==='form'"
            :title="title"
            :closable="closable"
            @deactivate="deactivate"
          >
            <slot slot="header" name="header" />
            <slot slot="content" name="content" />
            <slot slot="footer" name="footer" />
          </n-form>
          <slot v-else />
        </div>
      </transition>
    </n-scrollbar>
  </div>
</template>

<script>
import NScrollbar from '../../Scrollbar'
import NConfirm from './presets/Confirm'
import NForm from './presets/Form'

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
    // for confirm
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    submitText: {
      type: String,
      default: 'Confirm'
    },
    content: {
      type: String,
      default: 'content'
    }
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
  mounted () {
    console.log('contentInner', this.$slots)
    // this.$refs.confirm.$slots.footer = this.$scopedSlots.footer && this.$scopedSlots.footer()
    // this.$slots.default = this.$scopedSlots.default && this.$scopedSlots.default()
  },
  // mounted () {
  //   this.$nextTick().then(this.registerContent)
  // },
  // updated () {
  //   console.log('updated')
  //   this.$nextTick().then(this.registerContent)
  // },
  beforeDestroy () {
    // window.clearTimeout(this.updateScrollbarTimerId)
  },
  methods: {
    slotDOM () {
      const els = this.$refs.contentInner.childNodes
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
    handleAfterEnter () {
      // console.log('afterEnter', this.$refs.scrollbar.enableScrollbar())
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
    deactivate () {
      this.$emit('deactivate')
    },
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.$emit('submit')
    }
  }
}
</script>
