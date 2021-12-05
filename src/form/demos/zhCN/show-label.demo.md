# 显示/隐藏标签

当为 `show-label=false` 时，会隐藏 `n-form-item` 的 `label` 元素和占位。

若 `show-label` 在 `n-form-item` 上未被设定，则会继承 `n-form` 的 `show-label`，默认为 `true`。

```html
<n-space vertical>
  <n-space>Form:<n-switch v-model:value="formShowLabel" /></n-space>
  <n-space>Form Item:<n-switch v-model:value="formItemShowLabel" /></n-space>
  <n-form :model="formValue" ref="formRef" :show-label="formShowLabel">
    <n-form-item label="姓名" path="user.name" :show-label="formItemShowLabel">
      <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
    </n-form-item>
    <n-form-item label="年龄" path="user.age">
      <n-input placeholder="输入年龄" v-model:value="formValue.user.age" />
    </n-form-item>
    <n-form-item label="电话号码" path="user.phone">
      <n-input placeholder="电话号码" v-model:value="formValue.phone" />
    </n-form-item>
  </n-form>
</n-space>
```

```js
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
```
