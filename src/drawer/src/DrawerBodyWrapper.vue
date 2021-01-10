<template>
  <div
    v-if="displayDirective === 'show' || displayed || show"
    v-show="displayDirective === 'if' || displayed || show"
  >
    <!--
      Keep the wrapper dom. Make sure the drawer has a host. Nor the detached
      content will disappear without transition
    -->
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
          `n-drawer--${placement}-placement`,
          {
            [`n-drawer--native-scrollbar`]: nativeScrollbar
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
          :unstable-theme="NDrawer.mergedTheme.peers.Scrollbar"
          :unstable-theme-overrides="NDrawer.mergedTheme.overrides.Scrollbar"
        >
          <slot />
        </n-scrollbar>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watchEffect } from 'vue'
import { NScrollbar } from '../../scrollbar'

export default defineComponent({
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
  inject: ['NDrawer'],
  inheritAttrs: false,
  props: {
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
})
</script>
