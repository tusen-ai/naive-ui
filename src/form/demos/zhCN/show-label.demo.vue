<markdown>
# 显示/隐藏标签

若 `show-label` 在 `n-form-item` 上未被设定，则会继承 `n-form` 的 `show-label`，默认为 `true`。
</markdown>

<template>
  <n-space vertical>
    <n-space>Form:<n-switch v-model:value="formShowLabel" /></n-space>
    <n-space>Form Item:<n-switch v-model:value="formItemShowLabel" /></n-space>
    <n-form ref="formRef" :model="formValue" :show-label="formShowLabel">
      <n-form-item
        label="姓名"
        path="user.name"
        :show-label="formItemShowLabel"
      >
        <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="年龄" path="user.age">
        <n-input v-model:value="formValue.user.age" placeholder="输入年龄" />
      </n-form-item>
      <n-form-item label="电话号码" path="user.phone">
        <n-input v-model:value="formValue.phone" placeholder="电话号码" />
      </n-form-item>
    </n-form>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const formRef = ref(null)
    const formShowLabel = ref(true)
    const formItemShowLabel = ref(true)
    return {
      formRef,
      formValue: ref({
        user: {
          name: '',
          age: ''
        },
        phone: ''
      }),
      formShowLabel,
      formItemShowLabel
    }
  }
})
</script>
