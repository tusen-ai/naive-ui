# 动效

```html
<n-radio-group v-model:value="effect" style="margin-bottom: 10px;">
  <n-radio-button v-for="effect in effects" :key="effect" :value="effect">
    {{ effect }}
  </n-radio-button>
</n-radio-group>
<n-carousel :effect="effect" centered-slides style="height: 240px;">
  <img
    class="carousel-img"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
    :style="{width: effect === 'card' ? '60%' : '100%'}"
  />
  <img
    class="carousel-img"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
    :style="{width: effect === 'card' ? '60%' : '100%'}"
  />
  <img
    class="carousel-img"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
    :style="{width: effect === 'card' ? '60%' : '100%'}"
  />
  <img
    class="carousel-img"
    src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
    :style="{width: effect === 'card' ? '60%' : '100%'}"
  />
</n-carousel>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const effectRef = ref('slide')
    return {
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
