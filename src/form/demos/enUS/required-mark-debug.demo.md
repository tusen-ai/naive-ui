# Custom Rules

```html
<n-form
  :model="model"
  ref="form"
  :rules="rules"
  label-align="right"
  label-placement="left"
>
  <n-form-item-row path="age" label="Age">
    <n-input v-model:value="model.age" />
  </n-form-item-row>
  <n-form-item-row path="password" label="Password">
    <n-input
      v-model:value="model.password"
      @input="handlePasswordInput"
      type="password"
    />
  </n-form-item-row>
  <n-form-item-row
    path="reenteredPassword"
    label="Re-enter Password"
    ref="reenteredPassword"
  >
    <n-input
      :disabled="!model.password"
      v-model:value="model.reenteredPassword"
      type="password"
    />
  </n-form-item-row>
  <n-row :gutter="[0, 24]">
    <n-col :span="24">
      <div style="display: flex; justify-content: flex-end;">
        <n-button @click="handleValidateButtonClick" round type="primary"
          >Validate</n-button
        >
      </div>
    </n-col>
  </n-row>
</n-form>

<pre>
{{  JSON.stringify(model, 0, 2) }}
</pre>
```

```js
export default {
  inject: ['message'],
  data () {
    return {
      model: {
        age: null,
        password: null,
        reenteredPassword: null
      },
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
        reenteredPassword: [
          {
            validator: this.validatePasswordStartWith,
            message: 'Password is not same as re-entered password!',
            trigger: 'input'
          },
          {
            validator: this.validatePasswordSame,
            message: 'Password is not same as re-entered password!',
            trigger: ['blur', 'password-input']
          },
          {
            required: true,
            message: 'Re-entered Password is required',
            trigger: ['input', 'blur']
          }
        ]
      }
    }
  },
  methods: {
    handlePasswordInput () {
      if (this.model.reenteredPassword) {
        this.$refs.reenteredPassword.validate('password-input', (errors) => {
          if (!errors) {
            this.message.success('Valid')
          } else {
            console.log(errors)
            this.message.error('Invalid')
          }
        })
      }
    },
    handleValidateButtonClick (e) {
      e.preventDefault()
      this.$refs.form.validate((errors) => {
        if (!errors) {
          this.message.success('Valid')
        } else {
          console.log(errors)
          this.message.error('Invalid')
        }
      })
    },
    validatePasswordStartWith (rule, value) {
      return (
        this.model.password &&
        this.model.password.startsWith(value) &&
        this.model.password.length >= value.length
      )
    },
    validatePasswordSame (rule, value) {
      return value === this.model.password
    }
  }
}
```
