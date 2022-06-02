<markdown>
# 国际化

表单的规则支持 `renderMessage`，你可以利用它来完成验证信息的国际化。
</markdown>

<template>
  <n-space vertical>
    <n-radio-group v-model:value="locale">
      <n-space>
        <n-radio label="语言1" value="语言1" />
        <n-radio label="语言2" value="语言2" />
      </n-space>
    </n-radio-group>
    <n-form :model="model" :rules="rules">
      <n-form-item label="输入点什么去掉 error" path="input">
        <n-input v-model:value="model.input" />
      </n-form-item>
    </n-form>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FormRules } from 'naive-ui'

export default defineComponent({
  setup () {
    const localeRef = ref('语言1')
    const rules: FormRules = {
      input: {
        required: true,
        trigger: ['focus', 'input'],
        renderMessage: () => {
          return localeRef.value === '语言1'
            ? '抽离透传归因分析作为抓手为产品赋能'
            : '方法论是组合拳达到平台化标准'
        }
      }
    }
    const modelRef = ref({
      input: ''
    })
    return {
      rules,
      model: modelRef,
      locale: localeRef
    }
  }
})
</script>
