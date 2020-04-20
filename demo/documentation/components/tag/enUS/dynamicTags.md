# Edit Dynamically
```html
<n-dynamic-tags v-model="model.tags" @change="handleChange" />

Use in form.
<n-form :model="model" :rules="rules">
  <n-form-item
    path="tags"
  >
    <n-dynamic-tags v-model="model.tags" />
  </n-form-item>
</n-form>
{{model.tags}}
```
```js
export default {
  data () {
    return {
      model: {
        tags: ['teacher', 'programmer']
      },
      rules: {
        tags: {
          trigger: ['change'],
          validator (rule, value) {
            if (value.length >= 5) return new Error('Up to 4 tags')
            return true
          }
        }
      }
    }
  },
  methods: {
    handleChange (tags) {
      console.log('tags', tags)
    }
  }
}
```