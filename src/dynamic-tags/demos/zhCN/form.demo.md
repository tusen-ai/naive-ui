# 在表单中使用

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
        tags: ['教师', '程序员']
      },
      rules: {
        tags: {
          trigger: ['change'],
          validator (rule, value) {
            if (value.length >= 5) return new Error('不得超过四个标签')
            return true
          }
        }
      }
    }
  }
}
```
