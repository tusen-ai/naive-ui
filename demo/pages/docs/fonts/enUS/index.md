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

## Change Global Fonts by Customizing Theme

If you don't use `vfont` and want change global fonts by customzing theme, you need to use `n-global-style` to achieve that. Components' font won't be responsive to `theme-overrides` without `n-global-style`.

Note: Make `vfont` work without `n-global-style` is a compromised design (I think this is a correct behavior). In the next major version, global reset style won't contain font related style. They'll be all put inside `n-global-style` component.
