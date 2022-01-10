# Slides per view

```html
<n-alert title="Caveat" type="warning" style="margin-bottom: 16px;">
  This prop will conflict with `loop`. If you need to customize the number of displays per view, then the `loop` prop will be disabled.
</n-alert>
<n-carousel
  :slides-per-view="3"
  :space-between="20"
  :loop="false"
  draggable
>
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
