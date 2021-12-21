# Avatar Group

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
          name: 'Leonardo DiCaprio',
          src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
        },
        {
          name: 'Jennifer Lawrence',
          src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          name: 'Audrey Hepburn',
          src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
        },
        {
          name: 'Anne Hathaway',
          src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
        },
        {
          name: 'Taylor Swift',
          src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
        }
      ]
    }
  }
})
```
