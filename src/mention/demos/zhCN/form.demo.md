# 配合表单

```html
<n-space vertical>
  <n-form :model="formModel" :rules="rules" ref="formInstRef">
    <n-form-item label="Cool" path="cool">
      <n-mention :options="options" v-model:value="formModel.cool" />
    </n-form-item>
    <n-form-item label="Very Cool" path="veryCool">
      <n-mention
        type="textarea"
        :options="options"
        v-model:value="formModel.veryCool"
      />
    </n-form-item>
  </n-form>
  <n-button @click="handleButtonClick">Validate</n-button>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const formInstRef = ref(null)
    const formModelRef = ref({
      cool: '',
      veryCool: ''
    })
    const rules = {
      cool: {
        trigger: ['input', 'blur'],
        required: true,
        message: 'Cool is required'
      },
      veryCool: {
        trigger: ['input', 'blur'],
        validator () {
          if (!formModelRef.value.veryCool.includes('@07akioni')) {
            return Error('07akioni should be very cool!')
          }
        }
      }
    }
    return {
      formModel: formModelRef,
      formInstRef,
      rules,
      options: [
        {
          label: '07akioni',
          value: '07akioni'
        },
        {
          label: 'star-kirby',
          value: 'star-kirby'
        }
      ],
      handleButtonClick () {
        formInstRef.value.validate()
      }
    }
  }
})
```
