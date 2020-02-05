# 基础用法
下拉菜单的基础用法。
```html
<n-dropdown @select="handleSelect" :focusable="false" :options="options">
  <n-button>金钱所迫，起床工作</n-button>
</n-dropdown>
```
```js
export default {
  data () {
    return {
      options: [
        {
          label: '滨海湾金沙，新加坡',
          key: 'marina bay sands'
        },
        {
          label: '布朗酒店，伦敦',
          key: 'brown\'s hotel, london'
        },
        {
          label: '亚特兰蒂斯巴哈马，拿骚',
          key: 'atlantis nahamas, nassau'
        },
        {
          label: '比佛利山庄酒店，洛杉矶',
          key: 'the beverly hills hotel, los angeles'
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