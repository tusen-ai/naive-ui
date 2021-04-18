# Change Debug

```html
<n-form inline :label-width="80" :model="formValue" :rules="rules" ref="form">
  <n-form-item label="Name" path="user.name" v-if="show">
    <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
  </n-form-item>
  <n-form-item label="Age" path="user.age" v-else>
    <n-switch v-model:value="formValue.user.age" />
  </n-form-item>
  <n-form-item>
    <n-button @click="handleShowClick">show</n-button>
    <n-button @click="handleValidateClick">Validate</n-button>
  </n-form-item>
</n-form>

<pre>
{{  JSON.stringify(formValue, 0, 2) }}
</pre>
```

```js
import { useMessage } from 'naive-ui'

export default {
  setup () {
    return {
      message: useMessage()
    }
  },
  data () {
    return {
      show: true,
      formValue: {
        user: {
          name: '',
          age: false
        },
        phone: ''
      },
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
            validator (v) {
              return v === true
            }
          }
        },
        phone: {
          required: true,
          message: 'Please input your number',
          trigger: ['input']
        }
      }
    }
  },
  methods: {
    handleShowClick (e) {
      e.preventDefault()
      this.show = !this.show
    },
    handleValidateClick (e) {
      e.preventDefault()
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
