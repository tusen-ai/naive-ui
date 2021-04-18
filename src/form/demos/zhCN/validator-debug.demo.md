# Validator Debug

检测各种返回情况

```html
<n-form :model="formValue" :rules="rules" ref="form">
  <n-form-item label="syncBoolean" path="syncBoolean">
    <n-input placeholder="syncBoolean" v-model="formValue.syncBoolean" />
  </n-form-item>
  <n-form-item label="syncError" path="syncError">
    <n-input placeholder="syncError" v-model="formValue.syncError" />
  </n-form-item>
  <n-form-item label="syncException" path="syncException">
    <n-input placeholder="syncException" v-model="formValue.syncException" />
  </n-form-item>
  <n-form-item label="callbackFalse" path="callbackFalse">
    <n-input placeholder="callbackFalse" v-model="formValue.callbackFalse" />
  </n-form-item>
  <n-form-item label="callbackError" path="callbackError">
    <n-input placeholder="callbackError" v-model="formValue.callbackError" />
  </n-form-item>
  <n-form-item label="promiseRejectError" path="promiseRejectError">
    <n-input
      placeholder="promiseRejectError"
      v-model="formValue.promiseRejectError"
    />
  </n-form-item>
  <n-form-item label="promiseRejectString" path="promiseRejectString">
    <n-input
      placeholder="promiseRejectString"
      v-model="formValue.promiseRejectString"
    />
  </n-form-item>
  <n-form-item label="promiseException" path="promiseException">
    <n-input
      placeholder="promiseException"
      v-model="formValue.promiseException"
    />
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
import { useMessage } from 'naive-ui'

export default {
  setup () {
    return {
      message: useMessage()
    }
  },
  data () {
    return {
      formValue: {
        syncBoolean: '',
        syncError: '',
        syncException: '',
        callbackFalse: '',
        callbackError: '',
        promiseRejectError: '',
        promiseRejectString: '',
        promiseException: ''
      },
      rules: {
        syncBoolean: {
          trigger: 'input',
          validator (rule, value) {
            return value === 'test'
          },
          message: 'syncBoolean'
        },
        syncError: {
          trigger: 'input',
          validator (rule, value) {
            return value === 'test' ? true : Error('syncError')
          }
        },
        syncException: {
          trigger: 'input',
          validator: (rule, value) => {
            try {
              throw Error('Simulated Exception')
            } catch (err) {
              this.message.info('手动处理异常，不会完成验证')
              return true
            }
          }
        },
        callbackFalse: {
          trigger: 'input',
          asyncValidator (rule, value, done) {
            setTimeout(() => {
              done(value === 'test')
            }, 1000)
          }
        },
        callbackError: {
          trigger: 'input',
          asyncValidator (rule, value, done) {
            setTimeout(() => {
              if (value !== 'test') done(Error('callbackError'))
              else done(true)
            }, 1000)
          }
        },
        promiseRejectError: {
          trigger: 'input',
          validator (rule, value) {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (value !== 'test') {
                  reject(Error('promiseRejectError'))
                } else {
                  resolve()
                }
              }, 1000)
            })
          }
        },
        promiseRejectString: {
          trigger: 'input',
          validator (rule, value) {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (value !== 'test') {
                  reject(Error('promiseRejectString'))
                } else {
                  resolve()
                }
              }, 1000)
            })
          }
        },
        promiseException: {
          trigger: 'input',
          validator: (rule, value) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                reject(Error('Simulate Exeption'))
                resolve()
              }, 1000)
            }).catch(() => {
              this.message.info('手动处理异常，不会完成验证')
              return true
            })
          }
        }
      }
    }
  },
  methods: {
    handleValidateClick (e) {
      e.preventDefault()
      this.$refs.form
        .validate((errors) => {
          if (!errors) {
            this.message.success('Valid')
          } else {
            this.message.error('Invalid')
            console.log('errors', errors)
          }
        })
        .catch((error) => {
          this.message.error('验证出现错误')
          console.log('验证出现错误', error)
        })
    }
  }
}
```
