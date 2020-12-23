# 好几个圈

你可以在单个进度里面放好几个圈。注意 `circle-gap` 和 `stroke-width` 是相对 100 而言（SVG 的 viewbox 尺寸看作 100）。

或许你们的产品经理想要这种效果。

```html
<n-space vertical>
  <n-config-consumer>
    <template #="{ styleScheme }">
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
        <div style="text-align: center;">圈圈赛跑！</div>
      </n-progress>
    </template>
  </n-config-consumer>
  <n-space>
    <n-button @click="minus"> 减 10% </n-button>
    <n-button @click="add"> 加 10% </n-button>
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
