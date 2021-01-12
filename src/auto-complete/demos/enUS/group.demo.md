# Group

```html
<n-auto-complete :options="options" v-model:value="value" placeholder="Email" />
```

```js
export default {
  computed: {
    options () {
      return [
        ['Google', '@gmail.com'],
        ['Netease', '@163.com'],
        ['Tencent', '@qq.com']
      ].map((emailInfo) => {
        return {
          type: 'group',
          name: emailInfo[0],
          children: [this.value.split('@')[0] + emailInfo[1]]
        }
      })
    }
  },
  data () {
    return {
      value: ''
    }
  }
}
```
