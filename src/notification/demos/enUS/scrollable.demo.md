# Scrollable

If there are too many notifications, notifications container can be scrollable. However, in that case they will overlay a bit more area than them look, which will block some mouse events near notifications. If you don't want the feature, you can set `<n-notification-provider :scrollable="false" />` to make it unscrollable.

Change the property will cause all existing notifications to be cleaned, so please make sure you change this property at proper time.

```html
<n-button @click="handleClick">See how it scrolls</n-button>
```

```js
export default {
  inject: ['notification'],
  methods: {
    handleClick (scrollable) {
      Array.apply(null, { length: 5 }).forEach((notification) =>
        this.notification.create({
          title: 'Many Notifications',
          content: `Try to scroll
Try to scroll
Try to scroll
Try to scroll
Try to scroll
Try to scroll
Try to scroll`
        })
      )
    }
  }
}
```
