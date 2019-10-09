# Processing
Set `processing` prop to indicate it is processing.
```html
<n-badge dot processing>
  <n-icon type="ios-alarm" :size="24"/>
</n-badge>
<n-badge dot type="info" processing>
  <n-icon type="ios-alarm" :size="24"/>
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