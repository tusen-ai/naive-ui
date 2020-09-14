# 动态修改内容
你可以修改已经存在的通知
```html
<n-button @click="open">
  打开它
</n-button>
<n-button @click="change" :disabled="!notification">
  改它
</n-button>
```
```js
import { h, resolveComponent } from 'vue'

export default {
  inject: ['notification'],
  data () {
    return {
      notification: null
    }
  },
  methods: {
    open () {
      this.notification = this.notification.create({
        title: `Wouldn't it be Nice`,
        description: 'From the Beach Boys',
        content: `Wouldn't it be nice if we were older
Then we wouldn't have to wait so long
And wouldn't it be nice to live together
In the kind of world where we belong
You know its gonna make it that much better
When we can say goodnight and stay together
Wouldn't it be nice if we could wake up
In the morning when the day is new
And after having spent the day together
Hold each other close the whole night through`,
        meta: '2019-5-27 15:11',
        avatar: () => 
          h(resolveComponent('n-avatar'), {
            size: 'small',
            round: true,
            src:'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
          }),
        onClose: () => {
          this.notification = null
        }
      })
    },
    change () {
      if (this.notification) {
        this.notification.content = () => h('img', {
          src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
          style: 'width: 100%;'
        })
      }
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```