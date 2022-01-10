# 自定义过渡效果

如果你想要自定义过渡效果，可以使用 `transition-props`，并把 `effect` 设置为 `custom`，具体配置[参考](https://v3.cn.vuejs.org/api/built-in-components.html#transition)。

```html
<n-carousel
  effect="custom"
  :transition-props="{ name: 'creative' }"
  show-arrow
  style="width: 100%;height: 240px;"
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

:deep(.creative-enter-from),
:deep(.creative-leave-to) {
  opacity: 0;
  transform: scale(0.9);
}

:deep(.creative-enter-active),
:deep(.creative-leave-active) {
  transition: all 0.3s ease;
}
```
