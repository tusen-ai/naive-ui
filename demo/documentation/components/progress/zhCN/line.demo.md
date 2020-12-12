# 线型

事实上线型的进度条不需要这么多种样子，但是既然 UI 画了，我也就实现了。它支持 `default`、`info`、`success`、`warning` 和 `error` 的 `status`。

```html
<n-progress type="line" :percentage="percentage" :show-indicator="false" />
<n-progress type="line" :percentage="percentage" />
<n-progress
  type="line"
  :percentage="percentage"
  :indicator-placement="'inside'"
/>
<n-progress
  type="line"
  :percentage="percentage"
  :indicator-placement="'inside-label'"
/>
<n-progress
  type="line"
  status="info"
  :percentage="percentage"
  :show-indicator="false"
/>
<n-progress type="line" status="info" :percentage="percentage" />
<n-progress
  type="line"
  status="info"
  :percentage="percentage"
  :indicator-placement="'inside'"
/>
<n-progress
  type="line"
  status="info"
  :percentage="percentage"
  :indicator-placement="'inside-label'"
/>
<n-progress
  type="line"
  status="success"
  :percentage="percentage"
  :show-indicator="false"
/>
<n-progress type="line" status="success" :percentage="percentage" />
<n-progress
  type="line"
  status="success"
  :percentage="percentage"
  :indicator-placement="'inside'"
/>
<n-progress
  type="line"
  status="success"
  :percentage="percentage"
  :indicator-placement="'inside-label'"
/>
<n-progress
  type="line"
  status="warning"
  :percentage="percentage"
  :show-indicator="false"
/>
<n-progress type="line" status="warning" :percentage="percentage" />
<n-progress
  type="line"
  status="warning"
  :percentage="percentage"
  :indicator-placement="'inside'"
/>
<n-progress
  type="line"
  status="warning"
  :percentage="percentage"
  :indicator-placement="'inside-label'"
/>
<n-progress
  type="line"
  status="error"
  :percentage="percentage"
  :show-indicator="false"
/>
<n-progress type="line" status="error" :percentage="percentage" />
<n-progress
  type="line"
  status="error"
  :percentage="percentage"
  :indicator-placement="'inside'"
/>
<n-progress
  type="line"
  status="error"
  :percentage="percentage"
  :indicator-placement="'inside-label'"
/>
<n-button @click="minus"> 减 10% </n-button>
<n-button @click="add"> 加 10% </n-button>
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
  margin-bottom: 8px;
}
.n-button {
  margin: 0 8px 12px 0;
}
```
