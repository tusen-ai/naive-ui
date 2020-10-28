<template>
  <div
    v-if="displayDirective === 'show' || displayed || show"
    v-show="displayDirective === 'if' || displayed || show"
    class="n-modal-body-wrapper"
  >
    <n-scrollbar ref="scrollbar">
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
            [`n-${theme}-theme`]: theme,
          }"
        >
          <n-dialog
            v-if="preset === 'confirm' || preset === 'dialog'"
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
            <template v-if="$slots.header" v-slot:header>
              <slot name="header" />
            </template>
            <template v-if="$slots.icon" v-slot:icon>
              <slot name="icon" />
            </template>
            <slot />
            <template v-if="$slots.action" v-slot:action>
              <slot name="action" />
            </template>
          </n-dialog>
          <n-card
            v-else-if="preset === 'card'"
            :theme="theme"
            :style="compitableBodyStyle"
            :title="title"
            :closable="closable"
            :size="size"
            :bordered="bordered"
            :segmented="segmented"
            @close="handleCloseClick"
          >
            <template v-if="$slots.header" v-slot:header>
              <slot name="header" />
            </template>
            <template v-if="$slots['header-extra']" v-slot:header-extra>
              <slot name="header-extra" />
            </template>
            <template v-if="$slots.footer" v-slot:footer>
              <slot name="footer" />
            </template>
            <template v-if="$slots.action" v-slot:action>
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
import { nextTick, reactive, toRefs, toRef, watch, ref } from 'vue'
import NScrollbar from '../../scrollbar'
import NDialog from '../../dialog/src/Dialog.vue'
import NCard from '../../card'
import themeable from '../../_mixins/themeable'
import presetProps from './presetProps'
import clickoutside from '../../_directives/clickoutside'
import { useCompitable } from 'vooks'
import { useLastClickPosition } from '../../_utils/composition'

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
  mixins: [
    themeable
  ],
  provide () {
    return {
      NModalBody: this,
      NDrawerBody: null
    }
  },
  inject: {
    NModal: {
      default: null
    }
  },
  setup (props) {
    const dataRefs = toRefs(reactive({
      displayed: props.show,
      transformOriginX: null,
      transformOriginY: null
    }))
    watch(toRef(props, 'show'), value => {
      if (value) dataRefs.displayed.value = true
    })
    return {
      compitableBodyStyle: useCompitable(props, [
        'overlayStyle',
        'bodyStyle'
      ]),
      mousePosition: useLastClickPosition(),
      bodyRef: ref(null),
      ...dataRefs
    }
  },
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
  methods: {
    styleTransformOrigin () {
      const {
        transformOriginX,
        transformOriginY
      } = this
      if (transformOriginX === null || transformOriginY === null) {
        return null
      } else {
        const scrollTop = this.$refs.scrollbar.containerScrollTop
        return `${transformOriginX}px ${transformOriginY + scrollTop}px`
      }
    },
    syncTransformOrigin (el) {
      const {
        mousePosition
      } = this
      if (
        !mousePosition
      ) {
        return
      }
      const scrollTop = this.$refs.scrollbar.containerScrollTop
      const {
        offsetLeft,
        offsetTop
      } = el
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
