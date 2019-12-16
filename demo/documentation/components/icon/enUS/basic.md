# Basic
```html
<n-icon
  size="40"
>
  <ios-contacts/>
</n-icon>
<n-icon
  size="40"
  color="rgb(255, 0, 0)"
>
  <md-contacts/>
</n-icon>
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