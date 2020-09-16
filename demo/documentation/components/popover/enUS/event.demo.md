# Event
```html
<n-popover
  placement="bottom"
  trigger="hover"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:trigger>
    <n-button>
      Hover
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-popover>
<n-popover
  placement="bottom"
  trigger="click"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:trigger>
    <n-button>
      Click
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-popover>
<n-popover
  :show="showPopover"
  placement="bottom"
  @show="handleShow"
  @hide="handleHide"
>
  <template v-slot:trigger>
    <n-button @click="showPopover = !showPopover">
      Manual
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
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