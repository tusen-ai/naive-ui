# 和表单一起使用

我感觉这个例子没啥用，不过既然它也算个数据录入组件，就写上吧。

```html
<n-form :model="model">
  <n-form-item label="颜色（#18A058）" path="color" :rule="colorRule">
    <n-color-picker v-model:value="model.color" :show-alpha="false" />
  </n-form-item>
</n-form>
```

```js
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const model = reactive({
      color: '#18A058'
    })
    return {
      model,
      colorRule: {
        trigger: 'change',
        validator (_, value) {
          if (value !== '#18A058') return new Error('不许改颜色')
        }
      }
    }
  }
})
```
