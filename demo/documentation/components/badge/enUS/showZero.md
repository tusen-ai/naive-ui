# Show zero
Set `show-zero` prop to display zero.
```html
<n-badge :value="value">
  <div class="block" />
</n-badge>
<n-badge :value="value" show-zero>
  <div class="block" />
</n-badge>
<n-button-group>
  <n-button icon="md-add" @click="value += 1" />
  <n-button icon="md-remove" @click="value = Math.max(0, value - 1)" />
</n-button-group>
```
```js
export default {
  data() {
    return {
      value: 0
    };
  }
};
```
```css
.n-badge {
  margin: 0 32px 8px 0;
}
.block {
  width: 32px;
  height: 32px;
  background-color: #dddddd;
  border-radius: 4px;
  transition: background-color .3s cubic-bezier(.4, 0, .2, 1);
}
.n-dark-theme .block {
  background-color: rgba(255, 255, 255, .15);
}
```