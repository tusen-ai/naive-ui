# Set Dot Shape

Set `dot-shape` to change the indicator shape.

```html
<n-space>
  <n-radio-group v-model:value="dotShape">
    <n-radio-button value="dot">dot</n-radio-button>
    <n-radio-button value="line">line</n-radio-button>
    <n-radio-button value="slider">slider</n-radio-button>
  </n-radio-group>
  <n-carousel :dot-shape="dotShape" style="height: 240px;">
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
</n-space>
```

```js
import { ref } from 'vue'

export default {
  setup () {
    const dotShapeRef = ref('dot')
    return {
      dotShape: dotShapeRef
    }
  }
}
```

```css
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```
