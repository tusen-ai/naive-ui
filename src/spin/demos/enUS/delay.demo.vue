<markdown>
# Delay

You can specify a delay for displaying spin. If spinning ends during delay, spin won't appear.
</markdown>

<template>
  <n-space vertical>
    <n-spin :show="show" :delay="1000">
      <n-alert title="La La La" type="success">
        Leave it till tomorrow to unpack my case. Honey disconnect the phone.
      </n-alert>
    </n-spin>
    <n-button @click="show = !show">
      {{ show ? 'Click to stop Spin' : 'Click to Spin' }}
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
