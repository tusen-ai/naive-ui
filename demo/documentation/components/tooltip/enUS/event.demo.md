# Event

```html
<n-space>
  <n-tooltip placement="bottom" trigger="hover" @update:show="handleUpdateShow">
    <template v-slot:trigger>
      <n-button> Hover </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-tooltip>
  <n-tooltip placement="bottom" trigger="click" @update:show="handleUpdateShow">
    <template v-slot:trigger>
      <n-button> Click </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-tooltip>
  <n-tooltip :show="showPopover" placement="bottom">
    <template v-slot:trigger>
      <n-button @click="showPopover = !showPopover">
        Manual (No event will be emitted)
      </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-tooltip>
</n-space>
```

```js
export default {
  inject: ['message'],
  data () {
    return {
      showPopover: false
    }
  },
  methods: {
    handleUpdateShow (show) {
      this.message.success(show)
    }
  }
}
```
