# 触发方式

```html
<n-space>
  <n-tooltip placement="bottom" trigger="hover">
    <template v-slot:trigger>
      <n-button> 悬浮 </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-tooltip>
  <n-tooltip placement="bottom" trigger="click">
    <template v-slot:trigger>
      <n-button> 点击 </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-tooltip>
  <n-tooltip :show="showPopover" placement="bottom">
    <template v-slot:trigger>
      <n-button @click="showPopover = !showPopover"> 手动 </n-button>
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
