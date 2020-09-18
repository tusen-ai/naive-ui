# 可视高度
可以改变 Back Top 的可视高度。
```html
 <n-back-top
  :bottom="100"
  :visibility-height="300"
  :themed-style="{
    light: {
      color: 'rgb(0, 0, 0)',
      backgroundColor: 'rgba(0, 0, 0, .3)'
    },
    dark: {
      color: 'rgb(255, 255, 255)',
      backgroundColor: 'rgba(255, 255, 255, .3)'
    }
  }"
>
  <div style="width: 200px; height: 40px; line-height: 40px; text-align: center; font-size: 14px;">
    可视高度：300px
  </div>
</n-back-top>
```