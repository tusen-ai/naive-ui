# Inline Form
```html
<n-form
  inline
  :label-width="80"
  :value="formValue"
  ref="form"
>
  <n-form-item label="Name" path="name">
    <n-input v-model="formValue.name" placeholder="Input Name" />
  </n-form-item>
  <n-form-item label="Age" path="age">
    <n-input placeholder="Input Age" v-model="formValue.age"/>
  </n-form-item>
  <n-form-item label="Phone" path="phone">
    <n-input placeholder="Phone Number" v-model="formValue.phone"/>
  </n-form-item>
  <n-form-item v-model="formValue.phone">
    <n-button @click="handleValidateClick">Validate</n-button>
  </n-form-item>
</n-form>

<pre>
{{  JSON.stringify(formValue, 0, 2) }}
</pre>
```
```js
export default {
  data () {
    return {
      formValue: {
        name: '',
        age: '',
        phone: ''
      }
    }
  },
  methods: {
    handleValidateClick (e) {
      e.preventDefault()
      this.$refs.form.validate()
    }
  }
}
```