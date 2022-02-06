# Configuring Fonts

Naive UI works with [vfonts](https://github.com/07akioni/vfonts). You can use fonts from `vfonts` easily which includes general fonts and monospace fonts.

Just import fonts from in your app's entry file. Then it will work.

```js
// entry js file of your app
// ...

// General Font
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'
// then it works

// ...
```

Note: Different fonts from vfonts have different font weights. If you want to use `Lato` or `OpenSans` you need to configure the global font weight of naive-ui.

```html
<!-- configuring the global font weight -->
<n-config-provider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
  <app />
</n-config-provider>
```
