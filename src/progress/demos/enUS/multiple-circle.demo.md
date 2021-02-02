# Multiple Circle

You can show multiple circle in a single progress. Note that `circle-gap` and `stroke-width` is relative to 100(the svg's viewbox size is 100).

Maybe your product manager will need it.

```html
<n-space vertical>
  <n-el>
    <n-progress
      type="multiple-circle"
      :stroke-width="6"
      :circle-gap="0.5"
      :percentage="[
        percentage,
        (percentage + 10) % 100,
        (percentage + 20) % 100,
        (percentage + 30) % 100
      ]"
      :color="[
        'var(--info-color)',
        'var(--success-color)',
        'var(--warning-color)',
        'var(--error-color)'
      ]"
      :rail-style="[
        { stroke: 'var(--info-color)', opacity: 0.3 },
        { stroke: 'var(--success-color)', opacity: 0.3 },
        { stroke: 'var(--warning-color)', opacity: 0.3 },
        { stroke: 'var(--error-color)', opacity: 0.3 },
      ]"
    >
      <div style="text-align: center;">圈圈赛跑！</div>
    </n-progress>
  </n-el>
  <n-space>
    <n-button @click="minus"> Minus 10% </n-button>
    <n-button @click="add"> Add 10% </n-button>
  </n-space>
</n-space>
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
