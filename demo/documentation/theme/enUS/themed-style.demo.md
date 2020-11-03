# Use Themed Style
Some of components has `themed-style` prop to help you simply modify the style of outer element's style of a component. For some simple components it could be very useful.
```html
<div>
  <n-button @click="theme = 'dark'">Dark</n-button>
  <n-button @click="theme = 'light'">Light</n-button>
</div>
<n-config-provider :theme="theme">
  <n-card>
    <n-icon
      size="40"
      :themed-style="{
        dark: {
          fill: 'aquamarine'
        },
        light: {
          fill: 'green'
        }
      }"
    >
      <md-cash />
    </n-icon>
  </n-card>
</n-config-provider>
```
```js
import {
  MdCash,
  MdContacts,
  IosContacts
} from 'vicons/ionicons-v4'

export default {
  components: {
    MdCash,
    MdContacts,
    IosContacts
  },
  data () {
    return {
      theme: 'dark'
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```
