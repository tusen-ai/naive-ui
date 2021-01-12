# Event

```html
<n-space>
  <n-popover placement="bottom" trigger="hover" @update:show="handleUpdateShow">
    <template #trigger>
      <n-button> Hover </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-popover>
  <n-popover placement="bottom" trigger="click" @update:show="handleUpdateShow">
    <template #trigger>
      <n-button> Click </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-popover>
  <n-popover
    :show="showPopover"
    placement="bottom"
    @update:show="handleUpdateShow"
  >
    <template #trigger>
      <n-button @click="showPopover = !showPopover"> Manual </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-popover>
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
    handleUpdateShow (value) {
      this.message.success(`Update show: ${value}`)
    }
  }
}
```
