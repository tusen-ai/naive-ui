# Basic

```html
<n-button-group>
  <n-button @click="activate('top')">Top</n-button>
  <n-button @click="activate('right')">Right</n-button>
  <n-button @click="activate('bottom')">Bottom</n-button>
  <n-button @click="activate('left')">Left</n-button>
</n-button-group>
<n-drawer v-model:show="active" :width="502" :placement="placement">
  <n-drawer-content title="Stoner">
    Stoner is a 1965 novel by the American writer John Williams.
  </n-drawer-content>
</n-drawer>
```

```js
export default {
  data () {
    return {
      active: false,
      placement: 'right'
    }
  },
  methods: {
    activate (placement) {
      this.active = true
      this.placement = placement
    }
  }
}
```
