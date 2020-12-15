<template>
  <div
    v-if="displayDirective === 'show' || displayed || show"
    v-show="displayDirective === 'if' || displayed || show"
    class="n-modal-body-wrapper"
  >
    <n-scrollbar ref="scrollbar" content-class="n-modal-scroll-content">
      <transition
        name="n-fade-in-scale-up-transition"
        :appear="NModal.appear ?? NModal.isMounted"
        @enter="handleEnter"
        @after-leave="handleAfterLeave"
        @before-leave="handleBeforeLeave"
      >
        <div
          v-show="show"
          ref="bodyRef"
          v-clickoutside="handleClickOutside"
          class="n-modal"
          :class="{
            [`n-${theme}-theme`]: theme
          }"
        >
          <n-dialog
            v-if="preset === 'confirm' || preset === 'dialog'"
            v-bind="$attrs"
            :style="compitableBodyStyle"
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
            <template v-if="$slots.header" #header>
              <slot name="header" />
            </template>
            <template v-if="$slots.icon" #icon>
              <slot name="icon" />
            </template>
            <slot />
            <template v-if="$slots.action" #action>
              <slot name="action" />
            </template>
          </n-dialog>
          <n-card
            v-else-if="preset === 'card'"
            v-bind="$attrs"
            :theme="theme"
            :style="compitableBodyStyle"
            :title="title"
            :closable="closable"
            :size="size"
            :bordered="bordered"
            :segmented="segmented"
            @close="handleCloseClick"
          >
            <template v-if="$slots.header" #header>
              <slot name="header" />
            </template>
            <template v-if="$slots['header-extra']" #header-extra>
              <slot name="header-extra" />
            </template>
            <template v-if="$slots.footer" #footer>
              <slot name="footer" />
            </template>
            <template v-if="$slots.action" #action>
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
import { nextTick, reactive, toRefs, toRef, watch, ref, inject } from 'vue'
import { clickoutside } from 'vdirs'
import { useCompitable } from 'vooks'
import { NScrollbar } from '../../scrollbar'
import { NDialog } from '../../dialog'
import { NCard } from '../../card'
import { themeable } from '../../_mixins'
import presetProps from './presetProps'

export default {
  name: 'ModalBody',
  directives: {
    clickoutside
  },
  components: {
    NScrollbar,
    NDialog,
    NCard
  },
  mixins: [themeable],
  provide () {
    return {
      NModalBody: this,
      NDrawerBody: null
    }
  },
  inheritAttrs: false,
  props: {
    show: {
      type: Boolean,
      default: undefined
    },
    preset: {
      type: String,
      default: undefined
    },
    displayDirective: {
      type: String,
      default: undefined
    },
    ...presetProps,
    // events
    onClickoutside: {
      type: Function,
      default: undefined
    },
    onBeforeLeave: {
      type: Function,
      default: undefined
    },
    onAfterLeave: {
      type: Function,
      default: undefined
    },
    onPositiveClick: {
      type: Function,
      default: undefined
    },
    onNegativeClick: {
      type: Function,
      default: undefined
    },
    onClose: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const dataRefs = toRefs(
      reactive({
        displayed: props.show,
        transformOriginX: null,
        transformOriginY: null
      })
    )
    watch(toRef(props, 'show'), (value) => {
      if (value) dataRefs.displayed.value = true
    })
    const NModal = inject('NModal', null)
    return {
      NModal,
      mousePosition: toRef(NModal, 'mousePosition'),
      compitableBodyStyle: useCompitable(props, ['overlayStyle', 'bodyStyle']),
      bodyRef: ref(null),
      ...dataRefs
    }
  },
  methods: {
    styleTransformOrigin () {
      const { transformOriginX, transformOriginY } = this
      if (transformOriginX === null || transformOriginY === null) {
        return null
      } else {
        const scrollTop = this.$refs.scrollbar.containerScrollTop
        return `${transformOriginX}px ${transformOriginY + scrollTop}px`
      }
    },
    syncTransformOrigin (el) {
      const { mousePosition } = this
      if (!mousePosition) {
        return
      }
      const scrollTop = this.$refs.scrollbar.containerScrollTop
      const { offsetLeft, offsetTop } = el
      if (mousePosition) {
        const top = mousePosition.y
        const left = mousePosition.x
        this.transformOriginX = -(offsetLeft - left)
        this.transformOriginY = -(offsetTop - top - scrollTop)
      }
      el.style.transformOrigin = this.styleTransformOrigin()
    },
    handleEnter (el) {
      nextTick(() => {
        this.syncTransformOrigin(el)
      })
    },
    handleBeforeLeave (el) {
      el.style.transformOrigin = this.styleTransformOrigin()
      this.onBeforeLeave()
    },
    handleAfterLeave () {
      this.displayed = false
      this.transformOriginX = null
      this.transformOriginY = null
      this.onAfterLeave()
    },
    handleCloseClick () {
      this.onClose()
    },
    handleNegativeClick () {
      this.onNegativeClick()
    },
    handlePositiveClick () {
      this.onPositiveClick()
    },
    handleClickOutside (e) {
      this.onClickoutside(e)
    }
  }
}
</script>
