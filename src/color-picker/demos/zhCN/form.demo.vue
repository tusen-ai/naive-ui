<markdown>
# 和表单一起使用

我感觉这个例子没啥用，不过既然它也算个数据录入组件，就写上吧。
</markdown>

<template>
  <n-form :model="model">
    <n-form-item label="颜色（#18A058）" path="color" :rule="colorRule">
      <n-color-picker v-model:value="model.color" :show-alpha="false" />
    </n-form-item>
  </n-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const model = reactive({
      color: '#18A058'
    })
    return {
      model,
      colorRule: {
        trigger: 'change',
        validator (_: unknown, value: string) {
          if (value !== '#18A058') return new Error('不许改颜色')
        }
      }
    }
  }
})
</script>
