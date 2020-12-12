# Edit Dynamically

```html
<n-dynamic-tags v-model:value="model.tags" />
<p style="margin: 20px 0 16px 0;">Use in form.</p>
<n-form :model="model" :rules="rules">
  <n-form-item style="padding-top:0" path="tags">
    <n-dynamic-tags v-model:value="model.tags" />
  </n-form-item>
</n-form>
{{model.tags}}
```

```js
export default {
  data() {
    return {
      model: {
        tags: ['teacher', 'programmer']
      },
      rules: {
        tags: {
          trigger: ['change'],
          validator(rule, value) {
            if (value.length >= 5) return new Error('Up to 4 tags')
            return true
          }
        }
      }
    }
  }
}
```
