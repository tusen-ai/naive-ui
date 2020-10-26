# 可清除
让输入值可以清除（当有值的时候）。
```html
<n-space vertical>
  <n-input
    v-model:value="value"
    type="input"
    placeholder="可以清除"
    clearable
  />
  <n-input
    v-model:value="value"
    type="password"
    placeholder="可以清除"
    clearable
  />
  <n-input
    v-model:value="value"
    type="textarea"
    placeholder="可以清除"
    round
    clearable
  />
  <n-button size="small" @click="value = '可以清除'">填充内容</n-button>
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
