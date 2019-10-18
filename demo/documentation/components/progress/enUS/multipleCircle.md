# Multiple Circle
You can show multiple circle in a single progress. Note that `circle-gap` and `stroke-width` is relative to `view-box-width`.
```html
<n-progress
  type="multiple-circle"
  :view-box-width="80"
  :stroke-width="4"
  :circle-gap="2"
  :percentage="[percentage, (percentage +10) % 100, (percentage +20) % 100, (percentage + 30) % 100]"
  :color="['red', 'green', 'blue', null]"
  :rail-color="['rgba(0, 255, 0, .2)', 'rgba(0, 0, 255, .2)', 'rgba(255, 0, 0, .2)', 'rgba(255, 255, 255, .2)']"
>
  <div style="text-align: center;">
    CPU<br>
    Allocation<br>
    cores
  </div>
</n-progress>
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