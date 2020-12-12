# Line

In fact, progress of line type don't need four different styles. However, since UI has designed it, I finally implemented them all. It also support `default`, `info`, `success`, `warning` or `error` status.

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
<n-button @click="minus"> Minus 10% </n-button>
<n-button @click="add"> Add 10% </n-button>
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
