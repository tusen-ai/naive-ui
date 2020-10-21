# 动态编辑标签
```html
<n-dynamic-tags
  v-model:value="model.tags"
/>
<p style="margin: 20px 0 16px 0;">在表单中使用</p>
<n-form :model="model" :rules="rules">
  <n-form-item
    style="padding-top:0"
    path="tags"
  >
    <n-dynamic-tags v-model:value="model.tags" />
  </n-form-item>
</n-form>
{{model.tags}}
```
```js
export default {
  data () {
    return {
      model: {
        tags: ['武汉', '广东']
      },
      rules: {
        tags: {
          trigger: ['change'],
          validator (rule, value) {
            if (value.length >= 5) return new Error('最多允许四个标签')
            return true
          }
        }
      }
    }
  }
}
```