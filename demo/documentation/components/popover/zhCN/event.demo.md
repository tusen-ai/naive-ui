# 事件
```html
<n-popover
  placement="bottom"
  :width="200"
  trigger="hover"
  style="margin-right: 12px;"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:activator>
    <n-button>
      悬浮
    </n-button>
  </template>
  <span>
    我希望她们都是加州女孩
  </span>
</n-popover>
<n-popover
  placement="bottom"
  :width="200"
  trigger="click"
  style="margin-right: 12px;"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:activator>
    <n-button>
      点击
    </n-button>
  </template>
  <span>
    我希望她们都是加州女孩
  </span>
</n-popover>
<n-popover
  :show="showPopover"
  placement="bottom"
  :width="200"
  trigger="manual"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:activator>
    <n-button @click="showPopover = !showPopover">
      点击
    </n-button>
  </template>
  <span>
    我希望她们都是加州女孩
  </span>
</n-popover>
```

```js
export default {
  data() {
    return {
      showPopover: false
    };
  },
  methods: {
    handleShow() {
      this.$NMessage.success("show popover");
    },
    handleHide() {
      this.$NMessage.success("hide popover");
    }
  }
};
```

```css
.n-button {
  margin: 0 12px 8px 0;
}
```