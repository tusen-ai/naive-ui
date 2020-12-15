# Trigger

```html
<n-space>
  <n-popover trigger="hover">
    <template v-slot:trigger>
      <n-button>Hover</n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-popover>
  <n-popover trigger="click">
    <template v-slot:trigger>
      <n-button> Click </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-popover>
  <n-popover :show="showPopover">
    <template v-slot:trigger>
      <n-button @click="showPopover = !showPopover"> Manual </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-popover>
</n-space>
```

```js
export default {
  data () {
    return {
      showPopover: false
    }
  }
}
```
