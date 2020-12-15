# 触发方式

```html
<n-space>
  <n-popover trigger="hover">
    <template #trigger>
      <n-button>悬浮</n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-popover>
  <n-popover trigger="click">
    <template #trigger>
      <n-button> 点击 </n-button>
    </template>
    <span> I wish they all could be California girls </span>
  </n-popover>
  <n-popover :show="showPopover">
    <template #trigger>
      <n-button @click="showPopover = !showPopover"> 手动 </n-button>
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
