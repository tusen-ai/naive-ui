# Theme
Naive UI provides a simple way to custom style of icon in different themes.
```html
<n-icon
  size="40"
  :themed-style="{
    dark: {
      fill: 'rgba(255, 0, 0, .5)'
    },
    light: {
      fill: 'rgba(0, 128, 0, .5)'
    }
  }"
>
  <md-cash />
</n-icon>
```
```js
import mdCash from 'naive-ui/lib/icons/md-cash'

export default {
  components: {
    mdCash
  }
}
```