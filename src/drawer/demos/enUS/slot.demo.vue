<markdown>
# Custom header and bottom content
</markdown>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(false)
function activate() {
  active.value = true
}
</script>

<template>
  <n-button-group>
    <n-button @click="activate">
      Open
    </n-button>
  </n-button-group>
  <n-drawer v-model:show="active" :width="502">
    <n-drawer-content>
      <template #header>
        Header
      </template>
      <template #footer>
        <n-button>Footer</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
