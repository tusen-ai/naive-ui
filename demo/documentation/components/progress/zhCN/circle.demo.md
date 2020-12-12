# 圈

进度可以是个圈，它支持 `default`、`info`、`success`、`warning` 和 `error` 的 `status`。

```html
<n-progress type="circle" :percentage="percentage" />
<n-progress type="circle" status="info" :percentage="percentage" />
<n-progress type="circle" status="success" :percentage="percentage" />
<n-progress type="circle" status="warning" :percentage="percentage" />
<n-progress type="circle" status="error" :percentage="percentage" />
<div>
  <n-button @click="minus"> 减 10% </n-button>
  <n-button @click="add"> 加 10% </n-button>
</div>
```

```js
export default {
  data () {
    return {
      percentage: 0
    }
  },
  methods: {
    add () {
      this.percentage += 10
      if (this.percentage > 100) this.percentage = 0
    },
    minus () {
      this.percentage -= 10
      if (this.percentage < 0) this.percentage = 100
    }
  }
}
```

```css
.n-progress {
  margin: 0 8px 12px 0;
}
.n-button {
  margin: 0 8px 12px 0;
}
```
