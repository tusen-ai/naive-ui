<markdown>
# Multiple drawers
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const showOuter = ref(false)
const showInner = ref(false)

function doShowOuter() {
  showOuter.value = true
}

function doShowInner() {
  showInner.value = true
}
</script>

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
