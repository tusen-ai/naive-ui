<markdown>
# 设置高宽比

当`effect`属性为`card`时，你可以自定义，主card和前后两个card的高宽比。

</markdown>

<template>
  <n-carousel
    effect="card"
    :centered-slides="true"
    :scale="[1, 1.2]"
    style="height: 240px"
  >
    <n-carousel-item :style="{ width: '60%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
      >
    </n-carousel-item>
    <n-carousel-item :style="{ width: '60%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
      >
    </n-carousel-item>
    <n-carousel-item :style="{ width: '60%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
      >
    </n-carousel-item>
    <n-carousel-item :style="{ width: '60%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
      >
    </n-carousel-item>
  </n-carousel>
</template>

<style>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
