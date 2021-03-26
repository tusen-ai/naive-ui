# Async Validation

Support async. Make sure your validator returns a `Promise`.

```html
<n-form
  inline
  :label-width="80"
  :model="formValue"
  :rules="rules"
  ref="formRef"
>
  <n-form-item label="Name" path="user.name">
    <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
  </n-form-item>
  <n-form-item label="Age" path="user.age">
    <n-input placeholder="Input Age" v-model:value="formValue.user.age" />
  </n-form-item>
  <n-form-item label="Adress" path="user.address">
    <n-input
      placeholder="Input Address"
      v-model:value="formValue.user.address"
    />
  </n-form-item>
  <n-form-item label="Phone" path="phone">
    <n-input placeholder="Phone Number" v-model:value="formValue.phone" />
  </n-form-item>
  <n-form-item v-model:value="formValue.phone">
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
      formValue: ref({
        user: {
          name: 'name',
          age: '15',
          address: '0'
        },
        phone: '1251550092'
      }),
      rules: {
        user: {
          name: {
            required: true,
            trigger: 'blur',
            validator: (rule, value) => {
              return new Promise((resolve, reject) => {
                if (value !== 'testName') {
                  reject(Error('error name')) // reject with error message
                } else {
                  resolve()
                }
              })
            }
          },
          age: {
            required: true,
            trigger: 'input',
            validator: (rule, value) => {
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  if (value <= 16) {
                    reject(Error('error age'))
                  } else {
                    resolve()
                  }
                }, 3000)
              })
            }
          }
        },
        phone: {
          required: true,
          trigger: ['input'],
          validator: (rule, value) => {
            return /^[1]+[3,8]+\\d{9}$/.test(value)
          }
        }
      },
      handleValidateClick (e) {
        e.preventDefault()
        const messageReactive = message.loading('Verifying', {
          duration: 0
        })
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('Valid')
          } else {
            message.error('Invalid')
            console.log('errors', errors)
          }
          messageReactive.destroy()
        })
      }
    }
  }
})
```
