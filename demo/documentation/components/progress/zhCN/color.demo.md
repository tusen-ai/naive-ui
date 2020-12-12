# 自定义颜色

如果你觉得内置的颜色不行 🙅‍♂️。

```html
<n-config-consumer>
  <template v-slot="{ styleScheme }">
    <div>
      <n-progress
        style="margin: 0 8px 12px 0;"
        type="circle"
        :percentage="20"
        :color="styleScheme.successColor"
        :rail-color="styleScheme.successColor + '30'"
        :indicator-text-color="styleScheme.successColor"
      />
      <n-progress
        style="width: 120px; margin: 0 8px 12px 0;"
        type="multiple-circle"
        :stroke-width="10"
        :circle-gap="10"
        :percentage="[50, 25]"
        :color="[styleScheme.infoColor, styleScheme.infoColor]"
        :rail-color="[styleScheme.infoColor + '30', styleScheme.infoColor + '30']"
      />
      <n-progress
        type="line"
        indicator-placement="inside-label"
        :color="styleScheme.errorColor"
        :rail-color="styleScheme.errorColor + '30'"
        :percentage="20"
      />
      <n-progress
        type="line"
        :color="styleScheme.warningColor"
        :rail-color="styleScheme.warningColor + '30'"
        :percentage="20"
        :indicator-text-color="styleScheme.warningColor"
      />
    </div>
  </template>
</n-config-consumer>
```
