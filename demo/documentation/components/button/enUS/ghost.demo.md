# Ghost
Ghost button has transparent background.
```html
<n-button ghost>Default</n-button>
<n-button type="primary" ghost>Primary</n-button>
<n-button type="info" ghost>Info</n-button>
<n-button type="success" ghost>Success</n-button>
<n-button type="warning" ghost>Warning</n-button>
<n-button type="error" ghost>Error</n-button>
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