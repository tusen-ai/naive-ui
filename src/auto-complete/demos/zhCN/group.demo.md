# 成组

```html
<n-auto-complete :options="options" v-model:value="value" placeholder="邮箱" />
```

```js
export default {
  computed: {
    options () {
      return [
        ['谷歌', '@gmail.com'],
        ['网易', '@163.com'],
        ['腾讯', '@qq.com']
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
