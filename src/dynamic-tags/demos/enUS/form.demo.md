# Use in Form

```html
<n-form :model="model" :rules="rules">
  <n-form-item style="padding-top:0" path="tags">
    <n-dynamic-tags v-model:value="model.tags" />
  </n-form-item>
</n-form>
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
  }
}
```
