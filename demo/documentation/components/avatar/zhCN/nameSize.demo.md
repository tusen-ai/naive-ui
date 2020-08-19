# 字号
字号会根据内容文字自动调整。
```html
<n-avatar>{{ value }}</n-avatar>
<n-avatar circle>{{ value }}</n-avatar>
<n-avatar circle>the <br>{{ value }}</n-avatar>
<n-input v-model="value"/>
```
```js
export default {
  data () {
    return {
      value: 'Oasis'
    }
  }
}
```
```css
.n-avatar {
  margin: 0 8px 12px 0;
}
```