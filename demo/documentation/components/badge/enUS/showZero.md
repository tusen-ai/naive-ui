# Show zero
Set `show-zero` prop to display zero.
```html
<n-badge :value="value">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-badge :value="value" show-zero>
  <n-icon type="ios-alarm" :size="24" />
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
```