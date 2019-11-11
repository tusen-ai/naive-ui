# Basic
```html
<n-button @click="notify1">
  Wouldn't it be Nice
</n-button>
<n-button @click="notify2">
  Satisfaction
</n-button>
```
```js
export default {
  methods: {
    notify1 () {
      this.$nNotify({
        title: `Wouldn't it be Nice`,
        subtitle: 'From the Beach Boys',
        content: `Wouldn't it be nice if we were olderxxxxxxxxxxxxxxxxxxxxxxxx
Then we wouldn't have to wait so long
And wouldn't it be nice to live together
In the kind of world where we belong`,
        meta: '2019-5-27 15:11',
        action: [{
          name: 'Mark as read',
          onClick: (notificationVueInstance) => {
            notificationVueInstance.close()
          }
        }],
        avator: null,
        beforeClose: (next) => {
          next()
        },
        afterClose: (notificationVueInstance) => {
          const notification = notificationVueInstance.notification
          this.$NMessage.success(notification.title)
        },
      })
    },
    notify2 () {
      let markAsRead = false
      this.$nNotify({
        title: 'Satisfaction',
        content: `I cant get no satisfaction
I cant get no satisfaction
Cause I try and I try and I try and I try
I cant get no, I cant get no`,
        meta: '2019-5-27 15:11',
        beforeClose: (next) => {
          if (markAsRead) next()
        },
        action: [
          {
            name: 'Mark as read',
            onClick: (notificationVueInstance) => {
              const notification = notificationVueInstance.notification
              this.$NMessage.success(notification.title)
              markAsRead = true
              notificationVueInstance.close()
            }
          }
        ],
        avator: null
      })
    }
  }
}
```