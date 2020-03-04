# Multiple Drawers
```html
<n-button @click="activate">Come on!</n-button>
<n-drawer v-model="active" :width="502">
  <n-h1>Stoner</n-h1>
  <n-p>Stoner is a 1965 novel by the American writer John Williams.</n-p>
  <n-button @click="innerActivate">Come on Again!</n-button>
  <n-drawer v-model="innerActive" :width="251">
    <n-h1>Stoner</n-h1>
    <n-p>Stoner is a 1965 novel by the American writer John Williams.</n-p>
  </n-drawer>
</n-drawer>
```
```js
export default {
  data () {
    return {
      active: false,
      innerActive: false
    }
  },
  methods: {
    activate () {
      this.active = true
    },
    innerActivate () {
      this.innerActive = true
    }
  }
}
```