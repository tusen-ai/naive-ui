# 按键控制

在全屏的横向滚动上可能会有用，毕竟大部分的鼠标不能横着滚。

```html
<n-carousel keyboard>
  <img
    class="carousel-img"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
  />
  <img
    class="carousel-img"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
  />
  <img
    class="carousel-img"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
  />
  <img
    class="carousel-img"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
  />
</n-carousel>
```

```css
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
```
