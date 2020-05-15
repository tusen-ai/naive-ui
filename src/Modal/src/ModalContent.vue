<template>
  <div
    class="n-modal-content"
    :class="{
      'n-modal-content--active': styleActive
    }"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <n-scrollbar ref="scrollbar" @scroll="handleScroll">
      <transition
        name="n-modal-content-slot-transition"
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
            :style="overlayStyle"
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
            <template v-if="$scopedSlots.header" v-slot:header>
              <slot name="header" />
            </template>
            <template v-if="$scopedSlots.icon" v-slot:icon>
              <slot name="icon" />
            </template>
            <slot />
            <template v-if="$scopedSlots.action" v-slot:action>
              <slot name="action" />
            </template>
          </n-confirm>
          <n-card
            v-else-if="preset === 'card'"
            :theme="theme"
            :style="overlayStyle"
            :title="title"
            :closable="closable"
            :size="size"
            :bordered="bordered"
            :segmented="segmented"
            @close="handleCloseClick"
          >
            <template v-if="$scopedSlots.header" v-slot:header>
              <slot name="header" />
            </template>
            <template v-if="$scopedSlots['header-extra']" v-slot:header-extra>
              <slot name="header-extra" />
            </template>
            <template v-if="$scopedSlots.footer" v-slot:footer>
              <slot name="footer" />
            </template>
            <template v-if="$scopedSlots.action" v-slot:action>
              <slot name="action" />
            </template>
            <slot />
          </n-card>
          <slot v-else />
        </div>
      </transition>
    </n-scrollbar>
  </div>
</template>

<script>
import NScrollbar from '../../Scrollbar'
import NConfirm from '../../Confirm/src/Confirm'
import NCard from '../../Card'
import themeable from '../../_mixins/themeable'
import presetProps from './presetProps'

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
  name: 'NModalContent',
  components: {
    NScrollbar,
    NConfirm,
    NCard
  },
  provide () {
    return {
      NModal: this
    }
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
    ...presetProps
  },
  data () {
    return {
      styleActive: false,
      transformOriginX: null,
      transformOriginY: null,
      scrollTop: 0
    }
  },
  created () {
    if (this.active) {
      this.styleActive = true
    }
  },
  methods: {
    styleTransformOrigin () {
      const transformOriginX = this.transformOriginX
      const transformOriginY = this.transformOriginY
      if (transformOriginX === null || transformOriginY === null) {
        return null
      } else {
        return `${transformOriginX}px ${transformOriginY + this.scrollTop}px`
      }
    },
    getSlotDOM () {
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
        this.activateEvent
      ) {
        const top = this.activateEvent.clientY
        const left = this.activateEvent.clientX
        this.transformOriginX = -(offsetLeft - left)
        this.transformOriginY = -(offsetTop - top - scrollTop)
      } else if (mousePosition) {
        const top = mousePosition.y
        const left = mousePosition.x
        this.transformOriginX = -(offsetLeft - left)
        this.transformOriginY = -(offsetTop - top - scrollTop)
      }
      this.$refs.contentInner.style.transformOrigin = this.styleTransformOrigin()
    },
    handleBeforeLeave () {
      this.$refs.contentInner.style.transformOrigin = this.styleTransformOrigin()
      this.$refs.scrollbar.disableScrollbar()
      this.$emit('before-leave')
    },
    handleAfterLeave () {
      this.styleActive = false
      this.scrollTop = 0
      this.transformOriginX = null
      this.transformOriginY = null
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
    },
    handleScroll (e) {
      this.scrollTop = e.target.scrollTop
    },
    getDetachTarget () {
      return this.$refs.contentInner
    }
  }
}
</script>
