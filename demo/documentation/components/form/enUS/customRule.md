# Custom Rules
```html
<n-form :model="model" ref="form" :rules="rules">
  <n-row>
    <n-col :span="24">
      <n-form-item path="age" label="Age">
        <n-input v-model="model.age"/>
      </n-form-item>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="24">
      <n-form-item path="password" label="Password">
        <n-input v-model="model.password" @input="handlePasswordInput"/>
      </n-form-item>
    </n-col>
  </n-row>
  <n-row>
    <n-col :span="24">
      <n-form-item path="reenteredPassword" label="Re-enter Password" ref="reenteredPassword">
        <n-input v-model="model.reenteredPassword"/>
      </n-form-item>
    </n-col>
  </n-row>
  <n-row :gutter="[0, 24]">
    <n-col :span="24">
      <div style="display: flex; justify-content: flex-end;">
        <n-button @click="handleValidateButtonClick" round type="primary">Validate</n-button>
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
            validator (rule, value) {
              return /\d+/.test(value)
            },
            message: 'Age should be an integer',
            trigger: 'input'
          },
          {
            validator (rule, value) {
              return Number(value) > 18
            },
            message: 'Age should be greater than 18',
            trigger: 'input'
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
            trigger: 'blur'
          },
          {
            required: true,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handlePasswordInput () {
      this.$refs.reenteredPassword.validate('input')
    },
    handleValidateButtonClick (e) {
      e.preventDefault()
      this.$refs.form.validate()
    },
    validatePasswordStartWith (rule, value) {
      return this.model.password && this.model.password.startsWith(value) && this.model.password.length >= value.length
    },
    validatePasswordSame (rule, value) {
      return value === this.model.password
    }
  }
}
```