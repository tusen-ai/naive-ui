## Chrome Devtool can't read prop of skeleton

## ??? a `\n` must be added when use it repeatly

```html
<style>
  .a-skeleton {
    display: inline-block;
    height: 1em;
    width: 100%;
    background: green;
  }

  .a-space {
    border: 1px solid black;
  }
</style>
<div class="a-space" style="display: flex; flex-flow: column wrap;">
  <div style="max-width: 100%">
    <div class="a-skeleton"></div>
    <div class="a-skeleton"></div>
    <div class="a-skeleton"></div>
  </div>
</div>
```
