# Custom Rules

Sometimes builtin triggers don't meet you demand. You can custom you valiation by setting custom trigger in rules and manually trigger the validation.

```html
<n-form :model="model" ref="formRef" :rules="rules">
  <n-form-item path="age" label="Age">
    <n-input v-model:value="model.age" @keydown.enter.prevent />
  </n-form-item>
  <n-form-item path="password" label="Password">
    <n-input
      v-model:value="model.password"
      @input="handlePasswordInput"
      type="password"
      @keydown.enter.prevent
    />
  </n-form-item>
  <n-form-item
    first
    path="reenteredPassword"
    label="Re-enter Password"
    ref="rPasswordFormItemRef"
  >
    <n-input
      :disabled="!model.password"
      v-model:value="model.reenteredPassword"
      type="password"
      @keydown.enter.prevent
    />
  </n-form-item>
  <n-row :gutter="[0, 24]">
    <n-col :span="24">
      <div style="display: flex; justify-content: flex-end;">
        <n-button
          :disabled="model.age === null"
          @click="handleValidateButtonClick"
          round
          type="primary"
        >
          Validate
        </n-button>
      </div>
    </n-col>
  </n-row>
</n-form>

<pre>
{{  JSON.stringify(model, 0, 2) }}
</pre>
```

```js
import { defineComponent, ref } from 'vue'
import { useMessage } from 'naive-ui'

export default defineComponent({
  setup () {
    const formRef = ref(null)
    const rPasswordFormItemRef = ref(null)
    const message = useMessage()
    const modelRef = ref({
      age: null,
      password: null,
      reenteredPassword: null
    })
    function validatePasswordStartWith (rule, value) {
      return (
        modelRef.value.password &&
        modelRef.value.password.startsWith(value) &&
        modelRef.value.password.length >= value.length
      )
    }
    function validatePasswordSame (rule, value) {
      return value === modelRef.value.password
    }
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules: {
        age: [
          {
            required: true,
            validator (rule, value) {
              if (!value) {
                return new Error('Age is required')
              } else if (!/^\d*$/.test(value)) {
                return new Error('Age should be an integer')
              } else if (Number(value) < 18) {
                return new Error('Age should be above 18')
              }
              return true
            },
            trigger: ['input', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: 'Password is required'
          }
        ],
        reenteredPassword: [
          {
            required: true,
            message: 'Re-entered Password is required',
            trigger: ['input', 'blur']
          },
          {
            validator: validatePasswordStartWith,
            message: 'Password is not same as re-entered password!',
            trigger: 'input'
          },
          {
            validator: validatePasswordSame,
            message: 'Password is not same as re-entered password!',
            trigger: ['blur', 'password-input']
          }
        ]
      },
      handlePasswordInput () {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value.validate({ trigger: 'password-input' })
        }
      },
      handleValidateButtonClick (e) {
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
