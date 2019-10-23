# Basic
```html
<n-button @click="active = !active">
  active
</n-button>
<n-drawer v-model="active">
  777
</n-drawer>
```
```js
export default {
  data () {
    return {
      active: false
    }
  }
}
```