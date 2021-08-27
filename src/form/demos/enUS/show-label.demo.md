# Show / Hide Label

When `show-label` is set to `false`, `n-form-item`'s `label` element and its placeholder won't show.

If `show-label` will default to `true` if not set and inherit `n-form`'s `show-label`.

```html
<div :style="switchStyle">
  <label>n-form：</label>
  <n-switch v-model:value="formShowLabel" />
</div>
<div :style="switchStyle">
  <label>n-form-item：</label>
  <n-switch v-model:value="formItemShowLabel" />
</div>

<n-form :model="formValue" ref="formRef" :show-label="formShowLabel">
  <n-form-item label="Name" path="user.name" :show-label="formItemShowLabel">
    <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
  </n-form-item>
  <n-form-item label="Age" path="user.age">
    <n-input placeholder="Input Age" v-model:value="formValue.user.age" />
  </n-form-item>
  <n-form-item label="Phone" path="user.phone">
    <n-input placeholder="Input Phone" v-model:value="formValue.phone" />
  </n-form-item>
</n-form>
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
      formItemShowLabel,
      switchStyle: {
        marginBottom: '12px'
      }
    }
  }
})
```
