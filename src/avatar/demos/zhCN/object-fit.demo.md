# 图片如何适应容器

将 `object-fit` 设为 `'contain'`、`'cover'`、`'fill'`、`'none'`、`'scale-down'` 来设定适应容器的方式。

```html
<n-space align="flex-end">
  <n-avatar
    size="large"
    object-fit="contain"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
  />
  <n-avatar
    size="large"
    object-fit="cover"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
  />
  <n-avatar
    size="large"
    object-fit="fill"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
  />
  <n-avatar
    size="large"
    object-fit="none"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
  />
  <n-avatar
    size="large"
    object-fit="scale-down"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
  />
</n-space>
```
