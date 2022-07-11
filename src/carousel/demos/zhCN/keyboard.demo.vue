<markdown>
# 按键控制

是否通过按键切换轮播图，只有焦点在 Dots 上时才有效。
</markdown>

<template>
  <n-space vertical>
    <n-radio-group v-model:value="direction">
      <n-radio-button
        v-for="_direction in directions"
        :key="_direction"
        :value="_direction"
      >
        {{ _direction }}
      </n-radio-button>
    </n-radio-group>
    <n-carousel
      keyboard
      :direction="direction"
      :dot-placement="direction === 'vertical' ? 'right' : 'bottom'"
      style="height: 240px"
    >
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
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const directionRef = ref<'horizontal' | 'vertical'>('horizontal')
    return {
      direction: directionRef,
      directions: ['horizontal', 'vertical']
    }
  }
})
</script>

<style>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}
</style>
