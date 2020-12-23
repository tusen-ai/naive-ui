# Use Style Scheme (Deprecated)

Naive UI has a built-in style scheme. It's powerful for you to create Naive UI styled component. `n-config-consumer` & `n-element` have access to style scheme.

If you find `x-color` and `x-overlay-color` both exist, the `x-color` is composited by `base-background-color` and `x-overlay-color`. `x-color` is guranteed to be a opaque color and `x-overlay-color` is guranteed to be a translucent color.

Components inside naive-ui may use different variables in different themes. Because the different circurmstances need different types of color (opaque or translucent).

In most case you may want to use a `x-overlay-color`: For example is you use `primary-text-color` in the dark mode. It will darker than `primary-text-overlay-color`. Because `primary-text-color` is composited based on pure black(#000). But text are always not placed in a pure black background. In the light mode, those two colors usually looks the same, because `primary-text-overlay-color` is usually be displayed in a pure white background.

```html
<n-config-consumer #="{ styleScheme }">
  <button
    :style="{
      fontSize: '14px',
      padding: '8px',
      border: `1px solid ${styleScheme.primaryColor}`,
      outline: 'none',
      backgroundColor: 'transparent',
      color: styleScheme.primaryColor,
      transition: `all .3s ${styleScheme.easeInOutCubicBezier}`
    }"
  >
    Cool!
  </button>
</n-config-consumer>
<br />
<n-element tag="div" style="overflow: auto;" #="{ styleScheme }">
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
