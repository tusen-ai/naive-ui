# Trigger
```html
<n-popover placement="bottom" trigger="hover" style="margin-right: 12px;">
  <template v-slot:activator>
    <n-button>
      California Girls(Hover)
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-popover>
<n-popover v-model="showPopover" placement="bottom" trigger="manual">
  <template v-slot:activator>
    <n-button @click="showPopover = !showPopover">
      California Girls(Manual)
    </n-button>
  </template>
  <span>
    I wish they all could be California girls
  </span>
</n-popover>
<n-popover placement="bottom" trigger="click" style="margin-right: 12px;">
  <template v-slot:activator>
    <n-button>
      California Girls(Click)
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
  }
};
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```