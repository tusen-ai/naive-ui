# Icon
I like using icon in avatar.
```html
<n-avatar>
  <n-icon>
    <md-cash />
  </n-icon>
</n-avatar>
```
```js
import mdCash from 'naive-ui/lib/icons/md-cash.vue'
import mdContacts from 'naive-ui/lib/icons/md-contacts.vue'
import iosContacts from 'naive-ui/lib/icons/ios-contacts.vue'

export default {
  components: {
    mdCash,
    mdContacts,
    iosContacts
  }
}
```