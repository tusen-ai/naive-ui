# Global Style

Sometimes you want apply some naive-ui style to document body. For example font family, background color & font...

A specific scene is on iOS Safari, if you over-scroll the page in dark mode, the overflowed part will be white. At that time you may want to set body's color.

If you want work with theme, put it inside `n-config-provider`.

## Usage

```html
// default theme
<app>
  <n-global-style />
  ...
</app>
```

```html
// follow config-provider's theme
<n-config-provider>
  <n-global-style />
  ...
</n-config-provider>
```
