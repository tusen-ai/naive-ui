# 过渡效果

我们内置了几种常用的过渡效果。

如果你想要自定义过渡效果，可以使用 `transition-props`，并把 `effect` 设置为 `custom`。

```html
<n-radio-group v-model:value="effect" style="margin-bottom: 10px;">
  <n-radio-button v-for="effect in effects" :key="effect" :value="effect">
    {{ effect }}
  </n-radio-button>
</n-radio-group>
<n-carousel
  :effect="effect"
  :centered-slides="card"
  :slides-per-view="card ? 'auto' : 1"
  draggable
  :key="effect"
  style="height: 240px;"
>
  <n-carousel-item :style="{width: card ? '60%' : '100%'}">
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    />
  </n-carousel-item>
  <n-carousel-item :style="{width: card ? '60%' : '100%'}">
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    />
  </n-carousel-item>
  <n-carousel-item :style="{width: card ? '60%' : '100%'}">
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    />
  </n-carousel-item>
  <n-carousel-item :style="{width: card ? '60%' : '100%'}">
    <img
      class="carousel-img"
      src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    />
  </n-carousel-item>
</n-carousel>
```

```js
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const effectRef = ref('slide')
    const cardRef = computed(() => effectRef.value === 'card')
    return {
      card: cardRef,
      effect: effectRef,
      effects: ['slide', 'fade', 'card']
    }
  }
})
```

```css
.carousel-img {
  margin: 0 auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```
