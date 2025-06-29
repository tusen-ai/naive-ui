<markdown>
# Custom Dots
</markdown>

<template>
  <n-carousel autoplay>
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
    <template #dots="{ total, currentIndex }">
      <span class="custom-dots"> {{ currentIndex + 1 }} / {{ total }} </span>
    </template>
  </n-carousel>
</template>

<style>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.custom-dots {
  font-size: 12px;
  transform: translateY(5px);
}
</style>
