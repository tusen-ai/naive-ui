# Global Style

For the following reasons, you may need to set some styles on `document.body`

1. Naive-ui will mount some global style that is unresponsive (to theme, not media query). For example `font-family`. The style works fine by default, however they won't change when theme is changed.
2. `n-config-provider` can't sync global style (for example, body's background color) outside it.

You can use `n-global-style` to sync common global style to the body element. In the following example, `n-global-style` will sync the theme provided by `n-config-provider` to `document.body`.

## Usage

```html
// follow config-provider's theme
<n-config-provider>
  <n-global-style />
  ...
</n-config-provider>
```
