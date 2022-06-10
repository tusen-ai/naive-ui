<markdown>
# Multiple drawers
</markdown>

<template>
  <n-button @click="doShowOuter">
    Come on!
  </n-button>
  <n-drawer v-model:show="showOuter" :width="502">
    <n-drawer-content title="Stoner">
      Stoner is a 1965 novel by the American writer John Williams.
      <template #footer>
        <n-button @click="doShowInner">
          Come on Again!
        </n-button>
      </template>
    </n-drawer-content>
    <n-drawer v-model:show="showInner" :width="251">
      <n-drawer-content title="Stoner">
        Stoner is a 1965 novel by the American writer John Williams.
      </n-drawer-content>
    </n-drawer>
  </n-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const showOuterRef = ref(false)
    const showInnerRef = ref(false)
    return {
      showOuter: showOuterRef,
      showInner: showInnerRef,
      doShowOuter () {
        showOuterRef.value = true
      },
      doShowInner () {
        showInnerRef.value = true
      }
    }
  }
})
</script>
