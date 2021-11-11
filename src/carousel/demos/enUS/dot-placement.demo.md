# Set Dot Placement

Set `dot-placement` to change the indicator position.

```html
<n-space>
  <n-radio-group v-model:value="dotPlacement">
    <n-radio-button value="bottom">bottom</n-radio-button>
    <n-radio-button value="top">top</n-radio-button>
    <n-radio-button value="left">left</n-radio-button>
    <n-radio-button value="right">right</n-radio-button>
    <n-radio-button value="outer">outer</n-radio-button>
  </n-radio-group>
  <n-carousel :dot-placement="dotPlacement" style="height: 240px;">
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
import { ref, defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const dotPlacementRef = ref('bottom')
    return {
      dotPlacement: dotPlacementRef
    }
  }
})
```

```css
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```
