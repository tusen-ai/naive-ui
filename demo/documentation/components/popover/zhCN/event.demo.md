# 事件

```html
<n-popover placement="bottom" trigger="hover" @update:show="handleUpdateShow">
  <template v-slot:trigger>
    <n-button> 悬浮 </n-button>
  </template>
  <span> 我希望她们都是加州女孩 </span>
</n-popover>
<n-popover placement="bottom" trigger="click" @update:show="handleUpdateShow">
  <template v-slot:trigger>
    <n-button> 点击 </n-button>
  </template>
  <span> 我希望她们都是加州女孩 </span>
</n-popover>
<n-popover
  :show="showPopover"
  placement="bottom"
  @update:show="handleUpdateShow"
>
  <template v-slot:trigger>
    <n-button @click="showPopover = !showPopover"> 点击 </n-button>
  </template>
  <span> 我希望她们都是加州女孩 </span>
</n-popover>
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

```css
.n-button {
  margin: 0 12px 8px 0;
}
```
