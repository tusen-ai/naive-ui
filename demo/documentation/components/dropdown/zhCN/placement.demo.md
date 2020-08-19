# 弹出位置
使用不同的弹出位置。
```html
<n-dropdown
  @select="handleSelect"
  placement="bottom-start"
  :options="options"
>
  <n-button :keyboard="false">金钱所迫，起床工作</n-button>
</n-dropdown>
```
```js
export default {
  data () {
    return {
      options: [
        {
          label: '滨海湾金沙，新加坡',
          value: 'marina bay sands'
        },
        {
          label: '布朗酒店，伦敦',
          value: 'brown\'s hotel, london'
        },
        {
          label: '亚特兰蒂斯巴哈马，拿骚',
          value: 'atlantis nahamas, nassau'
        },
        {
          label: '比佛利山庄酒店，洛杉矶',
          value: 'the beverly hills hotel, los angeles'
        }
      ]
    }
  },
  methods: {
    handleSelect (key) {
      this.$NMessage.info(key)
    }
  }
}
```