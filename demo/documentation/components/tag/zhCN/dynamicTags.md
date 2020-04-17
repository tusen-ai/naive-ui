# 动态编辑标签
```html
<n-dynamic-tags v-model="model.tags" @change="hanleChange" />

在表单中使用
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
        tags: ['武汉', '广东']
      },
      rules: {
        tags: {
          trigger: ['change'],
          validator (rule, value) {
            if (value.length >= 5) return new Error('最多四个')
            return true
          }
        }
      }
    }
  },
  methods: {
    hanleChange (tags) {
      console.log('所有标签值', tags)
    }
  }
}
```