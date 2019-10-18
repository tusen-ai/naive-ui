# Line
```html
<n-progress
  type="line"
  :percentage="percentage"
  :show-indicator="false"
/>
<n-progress
  type="line"
  :percentage="percentage"
  processing
/>
<n-progress
  type="line"
  :percentage="percentage"
  :indicator-position="'inside'"
/>
<n-progress
  type="line"
  :percentage="percentage"
  :indicator-position="'inside-label'"
/>
<n-progress
  type="line"
  status="info"
  :percentage="percentage"
  :show-indicator="false"
/>
<n-progress
  type="line"
  status="info"
  :percentage="percentage"
/>
<n-progress
  type="line"
  status="info"
  :percentage="percentage"
  :indicator-position="'inside'"
/>
<n-progress
  type="line"
  status="info"
  :percentage="percentage"
  :indicator-position="'inside-label'"
/>
<n-progress
  type="line"
  status="success"
  :percentage="percentage"
  :show-indicator="false"
/>
<n-progress
  type="line"
  status="success"
  :percentage="percentage"
/>
<n-progress
  type="line"
  status="success"
  :percentage="percentage"
  :indicator-position="'inside'"
/>
<n-progress
  type="line"
  status="success"
  :percentage="percentage"
  :indicator-position="'inside-label'"
/>
<n-progress
  type="line"
  status="warning"
  :percentage="percentage"
  :show-indicator="false"
/>
<n-progress
  type="line"
  status="warning"
  :percentage="percentage"
/>
<n-progress
  type="line"
  status="warning"
  :percentage="percentage"
  :indicator-position="'inside'"
/>
<n-progress
  type="line"
  status="warning"
  :percentage="percentage"
  :indicator-position="'inside-label'"
/>
<n-progress
  type="line"
  status="error"
  :percentage="percentage"
  :show-indicator="false"
/>
<n-progress
  type="line"
  status="error"
  :percentage="percentage"
/>
<n-progress
  type="line"
  status="error"
  :percentage="percentage"
  :indicator-position="'inside'"
/>
<n-progress
  type="line"
  status="error"
  :percentage="percentage"
  :indicator-position="'inside-label'"
/>
<n-button @click="minus">
  Minus 10%
</n-button>
<n-button @click="add">
  Add 10%
</n-button>
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
```