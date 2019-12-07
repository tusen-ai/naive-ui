# Type
```html
<n-button @click="notify('info')">
  Info
</n-button>
<n-button @click="notify('success')">
  Success
</n-button>
<n-button @click="notify('warning')">
  Warning
</n-button>
<n-button @click="notify('error')">
  Error
</n-button>
```
```js
export default {
  methods: {
    notify (type) {
      this.$nNotify({
        title: `Wouldn't it be Nice`,
        description: 'From the Beach Boys',
        content: `Wouldn't it be nice if we were older.
Then we wouldn't have to wait so long.
And wouldn't it be nice to live together.
In the kind of world where we belong.`,
        meta: '2019-5-27 15:11'
      }, type)
    }
  }
}
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```