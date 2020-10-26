# 基础用法
文本输入的基础用法。
```html
<n-space vertical>
  <n-input v-model:value="value" type="input" placeholder="基本的 Input"/>
  <n-input v-model:value="value" type="textarea"  placeholder="基本的 Textarea"/>
</n-space>
```
```js
export default {
  data () {
    return {
      value: null
    }
  }
}
```
