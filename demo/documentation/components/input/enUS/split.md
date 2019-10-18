# Split
```html
<n-input split splitor="to" v-model="value" />
<n-input split splitor="to" v-model="value" icon="ios-calendar" icon-position="right"/>
<n-input split splitor="to" v-model="value" icon="ios-calendar" icon-position="right" clearable />
<n-input split splitor="to" v-model="value" icon="ios-calendar" clearable />
```
```js
export default {
  data () {
    return {
      value: []
    }
  }
}
```
```css
.n-input {
  margin-bottom: 8px;
}
```