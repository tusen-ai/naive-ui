# 指示点

设定 `dot-style` 来更改指示器的样式，可以使用 `never` 来隐藏指示点。

设定 `dot-placement` 来更改指示点的位置。

```html
<div>
  <n-radio-group v-model:value="style" style="margin-bottom: 10px;">
    <n-radio-button v-for="style in styles" :key="style" :value="style">
      {{ style }}
    </n-radio-button>
  </n-radio-group>
</div>
<div>
  <n-radio-group v-model:value="placement" style="margin-bottom: 10px;">
    <n-radio-button
      v-for="placement in placements"
      :key="placement"
      :value="placement"
    >
      {{ placement }}
    </n-radio-button>
  </n-radio-group>
</div>
<n-carousel
  :dot-style="style"
  :dot-placement="placement"
  :loop="false"
  draggable
  style="height: 240px;"
>
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
    const styleRef = ref('dot')
    const placementRef = ref('bottom')
    return {
      style: styleRef,
      styles: ['dot', 'line', 'progress', 'never'],
      placement: placementRef,
      placements: ['top', 'bottom', 'left', 'right']
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
