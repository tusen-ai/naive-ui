# Basic
```html
<n-badge hide-zero :value="value" :max="15">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-badge dot :show="value > 0">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-badge :value="value" type="error">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-badge :value="value" type="info">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-badge :value="value" type="success">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-badge :value="value" type="warning">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-button-group>
  <n-button icon="md-add" @click="value += 1" />
  <n-button icon="md-remove" @click="value -= 1" />
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
  margin: 0 24px 8px 0;
}
```