# 自定义颜色
这两个颜色看起来像毒蘑菇。
```html
<n-button color="#8a2be2">
  <template v-slot:icon>
    <n-icon>
      <cash-outline />
    </n-icon>
  </template>
  #8a2be2
</n-button>
<n-button color="#ff69b4">
  <template v-slot:icon>
    <n-icon>
      <cash-outline />
    </n-icon>
  </template>
  #ff69b4
</n-button>
<n-button ghost color="#8a2be2">
  <template v-slot:icon>
    <n-icon>
      <cash-outline />
    </n-icon>
  </template>
  #8a2be2
</n-button>
<n-button ghost color="#ff69b4">
  <template v-slot:icon>
    <n-icon>
      <cash-outline />
    </n-icon>
  </template>
  #ff69b4
</n-button>
<n-button text color="#8a2be2">
  <template v-slot:icon>
    <n-icon>
      <cash-outline />
    </n-icon>
  </template>
  #8a2be2
</n-button>
<n-button text color="#ff69b4">
  <template v-slot:icon>
    <n-icon>
      <cash-outline />
    </n-icon>
  </template>
  #ff69b4
</n-button>
```
```js
import cashOutline from 'naive-ui/lib/icons/cash-outline'

export default {
  components: {
    cashOutline
  }
}
```
```css
.n-button {
  margin: 0 8px 8px 0;
}
```