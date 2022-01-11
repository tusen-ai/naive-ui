# Effect

We have built-in several commonly used effects.

If you want to customize the transition effect, you can use `transition-props` and set `effect` to `custom`.

```html
<n-radio-group v-model:value="effect" style="margin-bottom: 10px;">
  <n-radio-button v-for="effect in effects" :key="effect" :value="effect">
    {{ effect }}
  </n-radio-button>
</n-radio-group>
<n-carousel :effect="effect" draggable :key="effect" style="height: 240px;">
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

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const effectRef = ref('slide')
    return {
      effect: effectRef,
      effects: ['slide', 'fade']
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
