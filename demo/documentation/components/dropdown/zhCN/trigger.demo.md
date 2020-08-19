# 触发
```html
<n-dropdown @select="handleSelect" trigger="hover" :options="options">
  <n-button :keyboard="false">悬浮！</n-button>
</n-dropdown>

<n-dropdown @select="handleSelect" trigger="click" :options="options">
  <n-button :keyboard="false">点击！</n-button>
</n-dropdown>

<n-dropdown @select="handleSelect" trigger="manual" :show="showDropdown" :options="options">
  <n-button :keyboard="false" @click="handleClick">噢！我要自己手动！</n-button>
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
      ],
      showDropdown: false
    }
  },
  methods: {
    handleSelect (name) {
      this.$NMessage.info(name)
    },
    handleClick () {
      this.showDropdown = !this.showDropdown
    }
  }
}
```

```css
.n-button {
  margin: 0 8px 12px 0;
}
```
