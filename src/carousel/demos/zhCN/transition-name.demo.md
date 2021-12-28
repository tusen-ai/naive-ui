# 自定义过渡效果

```html
<n-carousel transition-name="creative" style="width: 100%;height: 240px;">
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

::v-deep .creative-enter-from,
::v-deep .creative-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

::v-deep .creative-enter-active,
::v-deep .creative-leave-active {
  transition: all 0.3s ease;
}
```
