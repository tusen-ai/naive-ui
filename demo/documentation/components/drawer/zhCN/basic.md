# Basic
```html
<n-button @click="active = !active">
  active
</n-button>
<n-drawer v-model="active" :width="502">
  <n-h1>Hear the Wind Sing</n-h1>
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