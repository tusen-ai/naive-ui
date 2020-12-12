# Height Debug

Buggy!

```html
<n-form :model="formValue" :rules="rules" :size="size" ref="form">
  <n-form-item label="姓名" path="user.name">
    <n-input v-model:value="formValue.user.name" placeholder="输入姓名" />
  </n-form-item>
  <n-form-item label="电话号码" path="phone">
    <n-input placeholder="电话号码" v-model:value="formValue.phone" />
  </n-form-item>
  <n-form-item>
    <n-button @click="handleValidateClick" attr-type="button">验证</n-button>
  </n-form-item>
</n-form>

<pre>
{{  JSON.stringify(formValue, 0, 2) }}
</pre>
```

```js
export default {
  inject: ['message'],
  data() {
    return {
      size: 'medium',
      formValue: {
        user: {
          name: '',
          age: ''
        },
        phone: ''
      },
      rules: {
        user: {
          name: [
            {
              required: true,
              message: 'required',
              trigger: 'input'
            },
            {
              message: 'not a',
              trigger: 'input',
              validator(rule, value) {
                return value === 'x'
              }
            },
            {
              message: 'not b',
              trigger: 'input',
              validator(rule, value) {
                return value === 'x'
              }
            }
          ]
        },
        phone: {
          required: true,
          message: '请输入电话号码',
          trigger: ['input']
        }
      }
    }
  },
  methods: {
    handleValidateClick(e) {
      this.$refs.form.validate((errors) => {
        if (!errors) {
          this.message.success('Valid')
        } else {
          console.log(errors)
          this.message.error('Invalid')
        }
      })
    }
  }
}
```
