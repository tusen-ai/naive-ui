# Custom Rules
You can custom you valiation by setting custom trigger in rules.
```html
<n-form :model="model" ref="form" :rules="rules">
  <n-form-item-row path="age" label="Age">
    <n-input v-model="model.age"/>
  </n-form-item-row>
  <n-form-item-row path="password" label="Password">
    <n-input v-model="model.password" @input="handlePasswordInput" type="password"/>
  </n-form-item-row>
  <n-form-item-row
    first
    path="reenteredPassword"
    label="Re-enter Password"
    ref="reenteredPassword"
  >
    <n-input :disabled="!model.password" v-model="model.reenteredPassword" type="password"/>
  </n-form-item-row>
  <n-form-item-row label="Env" path="env" rule-path="null">
    <n-custom-add
      v-model="model.env"
    />
  </n-form-item-row>
  <n-form-item-row label="group" path="group" rule-path="null">
    <n-custom-add
      v-model="model.group"
    >
     <template v-slot="slotProps">
      <div style="width:100%">
        <n-form-item 
          :path="'group.' + slotProps.index + '.inputNumberValue'"
          rule-path="group.inputNumberValue"
          >
          <n-input-number v-model="slotProps.item.inputNumberValue"/>
        </n-form-item>
        <n-form-item 
          :path="'group.' + slotProps.index + '.test'"
          rule-path="group.test"
          >
          <n-input v-model="slotProps.item.test"/>
        </n-form-item>
      </div>
  </template>
    </n-custom-add>
  </n-form-item-row>
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
        reenteredPassword: null,
        env: [
          {
            key:'',
            value:''
          }
        ],
        group: [
          {
            isCheck: true,
            // num: null,
            // string: null
          }
        ]
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
        ],
        env: {
          key: {
            required: true,
            message: 'Please input your key',
            trigger: ['input', 'blur']
          },
          value: {
            required: true,
            message: 'Please input your value',
            trigger: ['input', 'blur']
          }
        },
        group: {
          inputNumberValue: {
           validator: this.validateGroupNumber,
            trigger: ['blur', 'change'],
            message: 'Please input a number which is not zero'
          },
          test: {
            required: true,
            message: 'Please input your key',
            trigger: ['input', 'blur']
          },
        }
      }
    }
  },
  methods: {
    handlePasswordInput () {
      if (this.model.reenteredPassword) {
        this.$refs.reenteredPassword.validate('password-input')
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
    },
    validateGroupNumber (rule, value) {
      console.log('value',value)
      return value !== 0
    }
  }
}
```