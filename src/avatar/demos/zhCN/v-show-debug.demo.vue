<markdown>
# v-show debug
</markdown>

<script lang="ts" setup>
import { onMounted, onUpdated, ref } from 'vue'

const isShow = ref(false)
const value = ref('Oasis111')

function toggle() {
  isShow.value = !isShow.value
}

onMounted(() => {
  console.log('world')
})

onUpdated(() => {
  console.log('hello')
})
</script>

<template>
  <n-space vertical item-style="line-height: 0;">
    <n-space>
      <n-button @click="toggle">
        toggle
      </n-button>
      <n-avatar v-show="isShow">
        {{ value }}
      </n-avatar>
      <n-avatar v-if="isShow" round>
        {{ value }}
      </n-avatar>
    </n-space>
    <n-input v-model:value="value" />
  </n-space>
</template>
