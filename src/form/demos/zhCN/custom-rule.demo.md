# 自定义规则

有时候内置的 trigger 无法满足验证的需要。你可以通过设定自定的 trigger 然后手动触发它来控制验证。

```html
<n-form :model="model" ref="form" :rules="rules">
  <n-form-item-row path="age" label="年龄">
    <n-input v-model:value="model.age" @keydown.enter.prevent />
  </n-form-item-row>
  <n-form-item-row path="password" label="密码">
    <n-input
      v-model:value="model.password"
      @input="handlePasswordInput"
      type="password"
      @keydown.enter.prevent
    />
  </n-form-item-row>
  <n-form-item-row
    first
    path="reenteredPassword"
    label="重复密码"
    ref="reenteredPassword"
  >
    <n-input
      :disabled="!model.password"
      v-model:value="model.reenteredPassword"
      type="password"
      @keydown.enter.prevent
    />
  </n-form-item-row>
  <n-row :gutter="[0, 24]">
    <n-col :span="24">
      <div style="display: flex; justify-content: flex-end;">
        <n-button
          @click="handleValidateButtonClick"
          :disabled="model.age === null"
          round
          type="primary"
        >
          验证
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
                return new Error('需要年龄')
              } else if (!/^\d*$/.test(value)) {
                return new Error('年龄应该为整数')
              } else if (Number(value) < 18) {
                return new Error('年龄应该超过十八岁')
              }
              return true
            },
            trigger: ['input', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          }
        ],
        reenteredPassword: [
          {
            required: true,
            message: '请再次输入密码',
            trigger: ['input', 'blur']
          },
          {
            validator: validatePasswordStartWith,
            message: '两次密码输入不一致',
            trigger: 'input'
          },
          {
            validator: validatePasswordSame,
            message: '两次密码输入不一致',
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
            message.success('验证成功')
          } else {
            console.log(errors)
            message.error('验证失败')
          }
        })
      }
    }
  }
})
```
