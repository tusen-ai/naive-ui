# Avatar Group

Crowded people.

```html
<n-avatar-group :options="options" :size="40" :max="2" />
```

```js
import { defineComponent } from 'vue'

export default defineComponent({
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
