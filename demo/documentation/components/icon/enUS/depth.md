# Depth
To match different level text colors, icon provides `depth` prop.
```html
<n-icon
  size="40"
  depth="primary"
>
  <cash-outline />
</n-icon>
<n-icon
  size="40"
  depth="secondary"
>
  <cash-outline />
</n-icon>
<n-icon
  size="40"
  depth="tertiary"
>
  <cash-outline />
</n-icon>
```
```js
import cashOutline from 'naive-ui/lib/icons/cash-outline'

export default {
  components: {
    cashOutline
  }
}
```