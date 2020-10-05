# 尺寸
太小太大好像都不怎么好看。
```html
<n-transfer
  ref="transfer"
  v-model:value="value"
  :options="options"
  size="small"
/>
<n-transfer
  ref="transfer"
  v-model:value="value"
  :options="options"
  size="large"
/>
```
```js
function createOptions () {
  return Array.apply(null, { length: 20 }).map((v, i) => ({
    label: 'Option' + i,
    value: i,
    disabled: i % 5 === 0
  }))
}

function createValues () {
  return Array.apply(null, { length: 5 }).map((v, i) => i)
}

export default {
  data () {
    return {
      options: createOptions(),
      value: createValues()
    }
  }
}
```
```css
.n-transfer {
  margin-bottom: 8px;
}
```