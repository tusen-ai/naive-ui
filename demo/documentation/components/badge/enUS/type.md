# Type
Badge has `default`, `error`, `info`, `success`, `warning` types.
```html
<n-badge dot>
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-badge dot type="error">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-badge dot type="info">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-badge dot type="success">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
<n-badge dot type="warning">
  <n-icon type="ios-alarm" :size="24" />
</n-badge>
```
```js
export default {
  data() {
    return {
      value: 10
    };
  }
};
```
```css
.n-badge {
  margin: 0 32px 8px 0;
}
```