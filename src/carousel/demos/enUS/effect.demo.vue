<markdown>
# Effect

If you want to customize the transition effect, you can use `transition-props` and set `effect` to `custom`.
</markdown>

<template>
  <n-radio-group v-model:value="myEffect" style="margin-bottom: 10px">
    <n-radio-button v-for="effect in effects" :key="effect" :value="effect">
      {{ effect }}
    </n-radio-button>
  </n-radio-group>
  <n-carousel
    :key="myEffect"
    :effect="myEffect"
    :centered-slides="isCard"
    :slides-per-view="isCard ? 'auto' : 1"
    draggable
    style="height: 240px"
  >
    <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
      >
    </n-carousel-item>
    <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
      >
    </n-carousel-item>
    <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
      >
    </n-carousel-item>
    <n-carousel-item :style="{ width: isCard ? '60%' : '100%' }">
      <img
        class="carousel-img"
        src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
      >
    </n-carousel-item>
  </n-carousel>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const effectRef = ref<'slide' | 'fade' | 'card'>('slide')
    const isCardRef = computed(() => effectRef.value === 'card')
    return {
      isCard: isCardRef,
      myEffect: effectRef,
      effects: ['slide', 'fade', 'card']
    }
  }
})
</script>

<style>
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
