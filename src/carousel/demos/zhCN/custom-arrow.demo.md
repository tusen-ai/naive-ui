# 自定义箭头

```html
<n-carousel show-arrow>
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
  <template
    #arrow="{
      total,
      current,
      slideTo,
      slidePrev,
      slideNext,
      getPrevIndex,
      getNextIndex,
      disabledPrev,
      disabledNext
    }"
  >
    <button
      type="button"
      class="curtom-arrow curtom-arrow--left"
      @click="slidePrev"
    >
      <n-icon><ArrowBack /></n-icon>
    </button>
    <button
      type="button"
      class="curtom-arrow curtom-arrow--right"
      @click="slideNext"
    >
      <n-icon><ArrowForward /></n-icon>
    </button>
  </template>
</n-carousel>
```

```js
import { ArrowBack, ArrowForward } from '@vicons/ionicons5'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ArrowBack,
    ArrowForward
  }
})
```

```css
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.curtom-arrow {
  position: absolute;
  top: 50%;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.11);
  color: #fff;
  font-size: 12px;
  text-align: center;
  transition: 0.3s;
  border-radius: 50%;
  border: 0;
  outline: none;
  transform: translateY(-50%);
  transition: 0.2s;
  cursor: pointer;
  z-index: 10;
}

.curtom-arrow--left {
  left: 16px;
  transform: translateY(-50%) translateX(-10px);
  opacity: 0;
}

.curtom-arrow--right {
  right: 16px;
  transform: translateY(-50%) translateX(10px);
  opacity: 0;
}

::v-deep .n-carousel:hover .curtom-arrow--left {
  transform: translateY(-50%) translateX(0);
  opacity: 1;
}

::v-deep .n-carousel:hover .curtom-arrow--right {
  transform: translateY(-50%) translateX(0);
  opacity: 1;
}
```
