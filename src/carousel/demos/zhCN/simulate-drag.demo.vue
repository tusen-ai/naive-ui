<markdown>
# 模拟拖拽

轮播图会默认启用 `Touch` 事件模拟，如果你需要轮播图响应鼠标拖拽，可以使用 `draggable` 属性。
</markdown>

<template>
  <n-carousel draggable>
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    >
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    >
  </n-carousel>
</template>

<style>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
