# 头像组

```html
<n-avatar-group round :options="options" :size="40" :max-avatar-count="2" />
```

```js
import { MdCash } from '@vicons/ionicons4'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    MdCash
  },
  setup () {
    return {
      options: [
        {
          name: '张三',
          src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
        },
        {
          name: '李四',
          src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          name: '王五',
          src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
        },
        {
          name: '赵六',
          src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          name: '七仔',
          src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
        }
      ]
    }
  }
})
```