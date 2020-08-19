# Visibility Height
You can change visibility height of backtop.
```html
 <n-back-top
  :bottom="100"
  :visibility-height="300"
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
    Visibility Height: 300px
  </div>
</n-back-top>
```