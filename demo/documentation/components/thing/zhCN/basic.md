# 基础用法
Thing 提供了很多 slot 来定制。
```html
<n-switch v-model="avatar"/>
<n-switch v-model="header"/>
<n-switch v-model="headerExtra"/>
<n-switch v-model="description"/>
<n-switch v-model="footer"/>
<n-switch v-model="action"/>
<n-thing>
  <template v-slot:avatar v-if="avatar">
    <n-avatar>
      <n-icon>
        <md-cash />
      </n-icon>
    </n-avatar>
  </template>
  <template v-slot:header v-if="header">
    货币
  </template>
  <template v-slot:header-extra v-if="headerExtra">
    <n-button circle size="tiny">
      <template v-slot:icon>
        <md-cash />
      </template>
    </n-button>
  </template>
  <template v-slot:description v-if="description">
    描述
  </template>
  货币是为了提高交易效率而用于交换的中介商品。货币有多种形式，如贝壳粮食等自然物、金属纸张等加工品、银行卡信用卡等磁条卡、移动支付加密货币等APP。
  <template v-slot:footer v-if="footer">
    尾部
  </template>
  <template v-slot:action v-if="action">
    <n-button size="tiny" style="margin-right: 8px;">
      <template v-slot:icon>
        <md-cash />
      </template>
      1 块钱
    </n-button>
    <n-button size="tiny" style="margin-right: 8px;">
      <template v-slot:icon>
        <md-cash />
      </template>
      10 块钱
    </n-button>
    <n-button size="tiny">
      <template v-slot:icon>
        <md-cash />
      </template>
      100 块钱
    </n-button>
  </template>
</n-thing>
```
```js
import mdCash from 'naive-ui/lib/icons/md-cash'

export default {
  components: {
    mdCash
  },
  data () {
    return {
      avatar: true,
      header: true,
      headerExtra: true,
      description: true,
      footer: true,
      action: true
    }
  }
}
```