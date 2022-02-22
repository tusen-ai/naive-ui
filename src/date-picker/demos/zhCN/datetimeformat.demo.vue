<markdown>
# 使用格式化的值

实话说我不喜欢这个 feature，因为多数情况下，传递时间字符串不是个最佳实践。但是现实世界是复杂的，我希望这个功能能帮你解决一些棘手的问题，比如为了后端传过来的数据买账。
</markdown>

<template>
  <pre>{{ formattedValue }}</pre>
  <n-date-picker
    v-model:formatted-value="formattedValue"
    value-format="yyyy.MM.dd HH:mm:ss"
    type="datetime"
    clearable
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      formattedValue: ref('2007.06.30 12:08:55')
    }
  }
})
</script>
