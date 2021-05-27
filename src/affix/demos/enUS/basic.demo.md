# Basic

Affix has `trigger-top`, `top`, `trigger-bottom` and `bottom`. `trigger-top` is top affixing trigger point. `top` is the style `top` value after top affixing is trigger. `trigger-bottom` and `bottom` work in similar way.

```html
<div class="container" ref="container">
  <div class="padding"></div>
  <div class="content">
    <n-row>
      <n-col :span="12">
        <n-affix
          :top="120"
          :trigger-top="60"
          :listen-to="() => $refs.container"
        >
          <n-tag>Affix Trigger Top 60px</n-tag>
        </n-affix>
      </n-col>
      <n-col :span="12">
        <n-affix
          :bottom="120"
          :trigger-bottom="60"
          :listen-to="() => $refs.container"
        >
          <n-tag>Affix Trigger Bottom 60px</n-tag>
        </n-affix>
      </n-col>
    </n-row>
  </div>
</div>
```

```css
.container {
  width: 100%;
  height: 200px;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 3px;
  overflow: auto;
}

.padding {
  height: 150px;
  width: 100%;
  background-color: rgba(128, 128, 128, 0.15);
}

.content {
  height: 600px;
}
```
