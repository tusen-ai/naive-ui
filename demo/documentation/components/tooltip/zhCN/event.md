# 事件
```html
<n-tooltip
  placement="bottom"
  trigger="hover"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:activator>
    <n-button>
      悬浮
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-tooltip>
<n-tooltip
  placement="bottom"
  trigger="click"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:activator>
    <n-button>
      点击
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-tooltip>
<n-tooltip
  v-model="showPopover"
  placement="bottom"
  trigger="manual"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:activator>
    <n-button @click="showPopover = !showPopover">
      手动
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-tooltip>
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
      this.$NMessage.success("show tooltip");
    },
    handleHide() {
      this.$NMessage.success("hide tooltip");
    }
  }
};
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```