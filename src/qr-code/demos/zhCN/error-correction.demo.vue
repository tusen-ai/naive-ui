<markdown>
  # 纠错

  使用 `error-correction-level` 来设定纠错级别。
</markdown>

<template>
  <n-space vertical>
    <n-qr-code
      value="犹如一位幽默风趣的魔术师，巧妙地将繁琐的信息变成了一个神秘的二维码"
      :error-correction-level="errorCorrectionLevel"
    />
    <n-radio-group v-model:value="errorCorrectionLevel">
      <n-radio-button
        v-for="errorCorrection in errorCorrectionOptions"
        :key="errorCorrection.value"
        :value="errorCorrection.value"
        :label="errorCorrection.label"
      />
    </n-radio-group>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const errorCorrectionLevel = ref('M')
    const errorCorrectionOptions = [
      { value: 'L', label: 'L' },
      { value: 'M', label: 'M' },
      { value: 'Q', label: 'Q' },
      { value: 'H', label: 'H' }
    ]
    return {
      errorCorrectionLevel,
      errorCorrectionOptions
    }
  }
})
</script>
