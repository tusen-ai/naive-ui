# Event
```html
<n-tooltip
  placement="bottom"
  trigger="hover"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:activator>
    <n-button>
      Hover
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
      Click
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-tooltip>
<n-tooltip
  :show="showPopover"
  placement="bottom"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:activator>
    <n-button @click="showPopover = !showPopover">
      Manual
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