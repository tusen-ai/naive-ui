<template>
  <transition name="n-fade-in-transition">
    <div v-if="show" class="n-base-menu-mask">
      <slot />
      {{ message }}
    </div>
  </transition>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'
import { useStyle } from '../../../_mixins'
import style from './styles/index.cssr.js'

export default {
  name: 'BaseMenuMask',
  setup () {
    useStyle('BaseMenuMask', style)
    const messageRef = ref(null)
    const timerIdRef = ref(null)
    const uncontrolledShowRef = ref(false)
    onBeforeUnmount(() => {
      const { value: timerId } = timerIdRef
      if (timerId !== null) {
        window.clearTimeout(timerId)
      }
    })
    return {
      message: messageRef,
      timerId: timerIdRef,
      show: uncontrolledShowRef,
      showOnce (message, duration = 1500) {
        const { value: timerId } = timerIdRef
        if (timerId) window.clearTimeout(timerId)
        uncontrolledShowRef.value = true
        messageRef.value = message
        timerIdRef.value = window.setTimeout(() => {
          uncontrolledShowRef.value = false
          messageRef.value = null
        }, duration)
      }
    }
  }
}
</script>
