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
export default {
  data () {
    return {
      notification: null
    }
  },
  methods: {
    open () {
      this.notification = this.$NNotification.open({
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
        avatar: h => 
          h('n-avatar', {
            props: {
              size: 'small',
              round: true,
              src:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573566445479&di=8804b1996cbf89582232a3994665454c&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3628555514%2C2933400515%26fm%3D214%26gp%3D0.jpg'
            }
          }),
        onClose: (next) => {
          next()
          this.notification = null
        }
      })
    },
    change () {
      if (this.notification) {
        this.notification.content = h => h('img', {
          attrs: {
            src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573566445479&di=8804b1996cbf89582232a3994665454c&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3628555514%2C2933400515%26fm%3D214%26gp%3D0.jpg'
          },
          style: {
            width: '100%'
          }
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