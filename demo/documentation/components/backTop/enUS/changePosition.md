# Change Position
For example: right 40px & bottom 160px.
```html
 <n-back-top
  :right="40"
  :bottom="160"
  :style="{
    transition: 'all .3s cubic-bezier(.4, 0, .2, 1)'
  }"
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
    Change Position
  </div>
</n-back-top>
```