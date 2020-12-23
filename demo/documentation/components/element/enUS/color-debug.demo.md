# Style Scheme (Deprecated)

It can also access style scheme.

To make sure you know what do these colors mean. See [Caveat on Using Style Scheme](../doc/n-theme#style-scheme).

```html
<n-element tag="div" class="myel" style="overflow: auto;" #="{ styleScheme }">
  <pre
    :style="{
      color: styleScheme.secondaryTextColor,
      transition: `color .3s ${styleScheme.easeInOutCubicBezier}`
    }"
  >
{{ JSON.stringify(styleScheme, 0, 2) }}</pre
  >
</n-element>
```
