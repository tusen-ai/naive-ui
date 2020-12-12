# 基础用法

```html
<n-time :time="0" />
<br />
<n-time :time="time" />
```

```js
export default {
  data () {
    return {
      time: new Date(0)
    }
  }
}
```
