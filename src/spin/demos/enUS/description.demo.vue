<markdown>
# Description

You can add some description under the spin.
</markdown>

<template>
  <n-space vertical>
    <n-spin :show="show">
      <n-alert title="La La La" type="success">
        Leave it till tomorrow to unpack my case. Honey disconnect the phone.
      </n-alert>
      <template #description>
        You know how lucky you are.
      </template>
    </n-spin>
    <n-button @click="show = !show">
      Click to Spin
    </n-button>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      show: ref(false)
    }
  }
})
</script>
