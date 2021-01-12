# 基础用法

```html
<n-space>
  <n-button @click="handleClick1"> Wouldn't it be Nice </n-button>
  <n-button @click="handleClick2"> Satisfaction </n-button>
</n-space>
```

```js
import { h, resolveComponent } from 'vue'

export default {
  inject: ['notification', 'message'],
  methods: {
    handleClick1 () {
      this.notification.create({
        title: "Wouldn't it be Nice",
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
            src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
          }),
        onAfterLeave: () => {
          this.message.success("Wouldn't it be Nice")
        }
      })
    },
    handleClick2 () {
      let markAsRead = false
      const notification = this.notification.create({
        title: 'Satisfaction',
        content: `I cant get no satisfaction
I cant get no satisfaction
Cause I try and I try and I try and I try
I cant get no, I cant get no`,
        meta: '2019-5-27 15:11',
        action: () =>
          h(
            resolveComponent('n-button'),
            {
              text: true,
              type: 'primary',
              onClick: () => {
                markAsRead = true
                notification.destroy()
              }
            },
            {
              default: () => '已读'
            }
          ),
        onClose: () => {
          if (!markAsRead) {
            this.message.warning('请设为已读')
            return false
          }
        }
      })
    }
  }
}
```
