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
        class="n-drawer"
        :class="[
          `n-drawer--${placement}-placement`,
          {
            [`n-${theme}-theme`]: theme,
            [bodyWrapperClass]: bodyWrapperClass
          }
        ]"
        :style="bodyWrapperStyle"
      >
        <n-scrollbar>
          <div
            ref="bodyRef"
            class="n-drawer-body"
            :class="{
              [bodyClass]: bodyClass
            }"
            :style="bodyStyle"
          >
            <slot />
          </div>
        </n-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import NScrollbar from '../../scrollbar'

export default {
  name: 'NDrawerContent',
  components: {
    NScrollbar
  },
  props: {
    theme: {
      type: String,
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
    bodyStyle: {
      type: Object,
      default: undefined
    },
    bodyClass: {
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
    }
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
  setup (props) {
    const displayedRef = ref(props.show)
    watchEffect(() => {
      if (props.show) displayedRef.value = true
    })
    return {
      displayed: displayedRef,
      bodyRef: ref(null),
      transitionName: computed(() => {
        return ({
          right: 'n-slide-in-from-right-transition',
          left: 'n-slide-in-from-left-transition',
          top: 'n-slide-in-from-top-transition',
          bottom: 'n-slide-in-from-bottom-transition'
        })[props.placement]
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
