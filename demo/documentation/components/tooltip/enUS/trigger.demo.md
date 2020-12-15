# Trigger

```html
<n-space>
  <n-tooltip placement="bottom" trigger="hover">
    <template v-slot:trigger>
      <n-button> Hover </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-tooltip>
  <n-tooltip placement="bottom" trigger="click">
    <template v-slot:trigger>
      <n-button> Click </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-tooltip>
  <n-tooltip :show="showPopover" placement="bottom">
    <template v-slot:trigger>
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
