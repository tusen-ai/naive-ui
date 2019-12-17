# Use Themed Style
Some of components has `themed-style` prop to help you simply modify the style of outer element's style of a component. For some simple components it could be very useful.
```html
<n-icon
  size="40"
  :themed-style="{
    dark: {
      fill: 'yellow'
    },
    light: {
      fill: 'red'
    }
  }"
>
  <md-cash />
</n-icon>
```
```js
import mdCash from 'naive-ui/lib/icons/md-cash'
import mdContacts from 'naive-ui/lib/icons/md-contacts'
import iosContacts from 'naive-ui/lib/icons/ios-contacts'

export default {
  components: {
    mdCash,
    mdContacts,
    iosContacts
  }
}
```
