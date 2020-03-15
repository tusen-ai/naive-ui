# Custom Rules
Sometimes builtin triggers don't meet you demand. You can custom you valiation by setting custom trigger in rules and manually trigger the validation.
```html
<n-form
  :model="model"
  ref="form"
  :rules="rules"
>
  <n-form-item-row
    path="age"
    label="Age"
  >
    <n-input
      v-model="model.age"
      @keydown.enter.native.prevent
    />
  </n-form-item-row>
  <n-form-item-row
    path="password"
    label="Password"
  >
    <n-input
      v-model="model.password"
      @input="handlePasswordInput"
      type="password"
      @keydown.enter.native.prevent
    />
  </n-form-item-row>
  <n-form-item-row
    first
    path="reenteredPassword"
    label="Re-enter Password"
    ref="reenteredPassword"
  >
    <n-input
      :disabled="!model.password"
      v-model="model.reenteredPassword"
      type="password"
      @keydown.enter.native.prevent
    />
  </n-form-item-row>
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
            validator: this.validatePasswordStartWith,
            message: 'Password is not same as re-entered password!',
            trigger: 'input'
          },
          {
            validator: this.validatePasswordSame,
            message: 'Password is not same as re-entered password!',
            trigger: ['blur', 'password-input']
          }
        ]
      }
    }
  },
  methods: {
    handlePasswordInput () {
      if (this.model.reenteredPassword) {
        this.$refs.reenteredPassword.validate({ trigger: 'password-input' })
      }
    },
    handleValidateButtonClick (e) {
      e.preventDefault()
      this.$refs.form.validate(errors => {
        if (!errors) {
          this.$NMessage.success('Valid')
        } else {
          console.log(errors)
          this.$NMessage.error('Invalid')
        }
      })
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