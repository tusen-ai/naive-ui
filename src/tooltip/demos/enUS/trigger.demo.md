# Trigger

```html
<n-space>
  <n-tooltip placement="bottom" trigger="hover">
    <template #trigger>
      <n-button> Hover </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-tooltip>
  <n-tooltip placement="bottom" trigger="click">
    <template #trigger>
      <n-button> Click </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-tooltip>
  <n-tooltip :show="showPopover" placement="bottom">
    <template #trigger>
      <n-button @click="showPopover = !showPopover"> Manual </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-tooltip>
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
