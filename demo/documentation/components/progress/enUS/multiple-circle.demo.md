# Multiple Circle

You can show multiple circle in a single progress. Note that `circle-gap` and `stroke-width` is relative to 100(the svg's viewbox size is 100).

Maybe your product manager will need it.

```html
<n-space vertical>
  <n-config-consumer>
    <template v-slot="{ styleScheme }">
      <n-progress
        type="multiple-circle"
        :stroke-width="6"
        :circle-gap="0.5"
        :percentage="[
        percentage,
        (percentage + 10) % 100,
        (percentage + 20) % 100,
        (percentage + 30) % 100]"
        :color="[
        styleScheme.infoColor,
        styleScheme.successColor,
        styleScheme.warningColor,
        styleScheme.errorColor
      ]"
        :rail-color="[
        styleScheme.infoColor + '30',
        styleScheme.successColor + '30',
        styleScheme.warningColor + '30',
        styleScheme.errorColor + '30'
      ]"
      >
        <div style="text-align: center;">Circle Racing!</div>
      </n-progress>
    </template>
  </n-config-consumer>
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
