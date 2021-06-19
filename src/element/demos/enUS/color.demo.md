# Theme Variabls

You can get theme variables from default slot.

```html
<n-element tag="div" class="myel" style="overflow: auto;" #="{ themeVars }">
  <pre
    :style="{
      color: themeVars.secondaryTextColor,
      transition: `color .3s ${themeVars.easeInOutCubicBezier}`
    }"
  >
{{ JSON.stringify(themeVars, 0, 2) }}</pre
  >
</n-element>
```
