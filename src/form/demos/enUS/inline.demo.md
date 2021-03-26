# Inline Form

A Example of inline form.

```html
<n-radio-group
  v-model:value="size"
  name="left-size"
  style="margin-bottom: 12px;"
>
  <n-radio-button value="small">Small</n-radio-button>
  <n-radio-button value="medium">Medium</n-radio-button>
  <n-radio-button value="large">Large</n-radio-button>
</n-radio-group>
<n-form
  inline
  :label-width="80"
  :model="formValue"
  :rules="rules"
  :size="size"
  ref="formRef"
>
  <n-form-item label="Name" path="user.name">
    <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
  </n-form-item>
  <n-form-item label="Age" path="user.age">
    <n-input placeholder="Input Age" v-model:value="formValue.user.age" />
  </n-form-item>
  <n-form-item label="Phone" path="phone">
    <n-input placeholder="Phone Number" v-model:value="formValue.phone" />
  </n-form-item>
  <n-form-item>
    <n-button @click="handleValidateClick">Validate</n-button>
  </n-form-item>
</n-form>

<pre>
{{  JSON.stringify(formValue, 0, 2) }}
</pre>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const formRef = ref(null)
    const message = useMessage()
    return {
      formRef,
      size: ref('medium'),
      formValue: ref({
        user: {
          name: '',
          age: ''
        },
        phone: ''
      }),
      rules: {
        user: {
          name: {
            required: true,
            message: 'Please input your name',
            trigger: 'blur'
          },
          age: {
            required: true,
            message: 'Please input your age',
            trigger: ['input', 'blur']
          }
        },
        phone: {
          required: true,
          message: 'Please input your number',
          trigger: ['input']
        }
      },
      handleValidateClick (e) {
        e.preventDefault()
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('Valid')
          } else {
            console.log(errors)
            message.error('Invalid')
          }
        })
      }
    }
  }
})
```
