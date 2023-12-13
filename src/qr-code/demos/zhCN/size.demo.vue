<markdown>
  # 尺寸

  它就像疯狂千层饼，无论大小，都会引领你进入另一个神秘的信息空间。
</markdown>

<template>
  <n-space vertical>
    <n-space>
      <n-button @click="minus">
        减 10
      </n-button>
      <n-button @click="add">
        加 10
      </n-button>
    </n-space>
    <n-qr-code :value="text" :size="size" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const text = ref('The rain dampened the sky')

    const size = ref(110)

    const add = () => {
      size.value += 10
      if (size.value > 200) {
        size.value = 110
      }
    }

    const minus = () => {
      size.value -= 10
      if (size.value < 20) {
        size.value = 110
      }
    }

    return {
      size,
      text,
      add,
      minus
    }
  }
})
</script>
