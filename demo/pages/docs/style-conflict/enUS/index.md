# Potential Style Conflict

## Style Element Position

Sometimes you want to control where the style element should be inserted.

For example. If you have a tailwind reset style, you don't want it to be inserted after naive-ui's style. Since it may override button's style, etc.

You can create a `<meta name="naive-ui-style" />` element inside `head` element, then naive-ui's style will be inserted right before it.

Also, naive-ui uses [vueuc](https://github.com/07akioni/vueuc). If you need, its style can be controlled by `<meta name="vueuc-style" />` (generally it's not needed).

```html
<head>
  <xxx />
  <!-- naive-ui's style will be inserted here -->
  <meta name="naive-ui-style" />
  <!-- vueuc's style will be inserted here -->
  <meta name="vueuc-style" />
  <xxx />
</head>
```

## About Tailwind's Preflight Style Override

You may find adding a meta tag to your static html files doesn't work (naive's style would still be overriden), since your toolchain may always insert tailwind's style at the end of the head tag. In this situation, you need to insert the meta tag dynamically right before the app is mounted.

```ts
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

vueApp.mount('#app')
```

## Disable Preflight Style (CSS Reset)

To make naive-ui work for most users out of box, mounting any component of naive would create global preflight style. However it may not be expected. If you want to disable it, using `n-config-provider` like this.

```html
<n-config-provider preflight-style-disabled>
  <your-app />
</n-config-provider>
```
