# Style Element Position

Sometimes you want to control where the style element should be inserted.

For example. If you have a tailwind reset style, you don't want it to be inserted after naive-ui's style. Since it may overrides button's style, etc.

You can create a `<meta name="naive-ui-style" />` element inside `head` element, then naive-ui's style will be inserted right before it.

```html
<head>
  <xxx />
  <!-- naive-ui's style will be inserted here -->
  <meta name="naive-ui-style" />
  <xxx />
</head>
```
