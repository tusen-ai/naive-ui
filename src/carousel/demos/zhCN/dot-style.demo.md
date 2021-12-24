# 更改指示点样式

设定 `dot-style` 来更改指示点的样式。

```html
<n-radio-group v-model:value="style" style="margin-bottom: 10px;">
  <n-radio-button v-for="style in styles" :key="style" :value="style">
    {{ style }}
  </n-radio-button>
</n-radio-group>
<n-carousel :dot-style="style" style="height: 240px;">
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
    return {
      style: styleRef,
      styles: ['dot', 'line', 'progress', 'never']
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
