<template>
  <div
    v-if="displayDirective === 'show' || displayed || show"
    v-show="displayDirective === 'if' || displayed || show"
    class="n-drawer-container"
  >
    <transition
      :name="transitionName"
      :appear="NDrawer.isMounted"
      @after-leave="handleAfterLeave"
    >
      <div
        v-show="show"
        ref="bodyRef"
        class="n-drawer"
        v-bind="$attrs"
        :class="[
          $attrs.class,
          `n-drawer--${placement}-placement`,
          {
            [`n-drawer--native-scrollbar`]: nativeScrollbar,
            [`n-${theme}-theme`]: theme
          }
        ]"
      >
        <template v-if="nativeScrollbar">
          <slot />
        </template>
        <n-scrollbar
          v-else
          v-bind="scrollbarProps"
          content-class="n-drawer-scroll-content"
        >
          <slot />
        </n-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import { NScrollbar } from '../../scrollbar'

export default {
  name: 'NDrawerContent',
  components: {
    NScrollbar
  },
  provide () {
    return {
      NDrawerBody: this,
      NModalBody: null
    }
  },
  inject: {
    NDrawer: {
      default: null
    }
  },
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: undefined
    },
    show: {
      type: Boolean,
      default: undefined
    },
    displayDirective: {
      type: String,
      required: true
    },
    placement: {
      type: String,
      required: true
    },
    nativeScrollbar: {
      type: Boolean,
      required: true
    },
    scrollbarProps: {
      type: Object,
      default: undefined
    }
  },
  setup (props) {
    const displayedRef = ref(props.show)
    watchEffect(() => {
      if (props.show) displayedRef.value = true
    })
    return {
      displayed: displayedRef,
      bodyRef: ref(null), // used for detached content
      transitionName: computed(() => {
        return {
          right: 'n-slide-in-from-right-transition',
          left: 'n-slide-in-from-left-transition',
          top: 'n-slide-in-from-top-transition',
          bottom: 'n-slide-in-from-bottom-transition'
        }[props.placement]
      })
    }
  },
  methods: {
    handleAfterLeave () {
      this.displayed = false
    }
  }
}
</script>
