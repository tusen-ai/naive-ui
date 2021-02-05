# Use as a Component

Sometimes you may want to use a component.

```html
<n-dialog
  title="Dialog"
  content="Are you sure?"
  :closable="false"
  negative-text="Cancel"
  positive-text="Submit"
  @positive-click="handlePositiveClick"
  @negative-click="handleNegativeClick"
/>
```

```js
import { useMessage } from 'naive-ui'

export default {
  setup () {
    const message = useMessage()
    return {
      handleNegativeClick () {
        message.warning('Cancel')
      },
      handlePositiveClick () {
        message.success('Confirm')
      }
    }
  }
}
```
