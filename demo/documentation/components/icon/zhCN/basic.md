# 基础用法
```html
<n-icon
  size="40"
>
  <ios-contacts/>
</n-icon>
<n-icon
  size="40"
  color="rgba(0, 128, 0, .5)"
>
  <md-contacts/>
</n-icon>
```
```js
import mdContacts from 'naive-ui/lib/icons/md-contacts'
import iosContacts from 'naive-ui/lib/icons/ios-contacts'

export default {
  components: {
    mdContacts,
    iosContacts
  }
}
```