# 透明背景
`Ghost` 按钮有透明的背景。
```html
<n-button ghost>Default</n-button>
<n-button round type="primary" ghost>Primary</n-button>
<n-button type="info" ghost>Info</n-button>
<n-button circle type="success" ghost >
  <template v-slot:icon>
    <md-save />
  </template>
</n-button>
<n-button type="warning" ghost>Warning</n-button>
<n-button type="error" ghost disabled>Error</n-button>
```
```js
import mdSave from 'naive-ui/lib/icons/md-save'

export default {
  components: {
    mdSave
  }
}
```
```css
.n-button {
  margin: 0 8px 8px 0;
}
```