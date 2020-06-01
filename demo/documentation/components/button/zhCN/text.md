# 文本按钮
有些人也会叫他 `link` 按钮。
```html
<n-button
  text
  size="large"
>
  <template v-slot:icon>
    <n-icon>
      <train-outline />
    </n-icon>
  </template>
  那车头依然吐着烟
</n-button>
```
```js
import trainOutline from 'naive-ui/lib/icons/train-outline'

export default {
  components: {
    trainOutline
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```
