<markdown>
# 自动每屏显示数量
</markdown>

<template>
  <n-carousel
    slides-per-view="auto"
    :space-between="20"
    :loop="false"
    draggable
  >
    <n-carousel-item style="width: 60%">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
      >
    </n-carousel-item>
    <n-carousel-item style="width: 20%">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
      >
    </n-carousel-item>
    <n-carousel-item style="width: 40%">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
      >
    </n-carousel-item>
    <n-carousel-item style="width: 10%">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
      >
    </n-carousel-item>
  </n-carousel>
</template>

<style>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
