# 内容缩进
内容可以缩进到头像旁边。
```html
<n-row>
  <n-col :span="12">
    <n-checkbox v-model:checked="avatar">头像</n-checkbox>
  </n-col>
  <n-col :span="12">
    <n-checkbox v-model:checked="action">操作</n-checkbox>
  </n-col>
</n-row>
<n-row>
  <n-col :span="12">
    <n-checkbox v-model:checked="header">标题</n-checkbox>
  </n-col>
  <n-col :span="12">
    <n-checkbox v-model:checked="headerExtra">标题附加信息</n-checkbox>
  </n-col>
</n-row>
<n-row>
  <n-col :span="12">
    <n-checkbox v-model:checked="description">描述</n-checkbox>
  </n-col>
  <n-col :span="12">
    <n-checkbox v-model:checked="footer">底部</n-checkbox>
  </n-col>
</n-row>
<n-divider />
<n-thing content-indented>
  <template v-slot:avatar v-if="avatar">
    <n-avatar>
      <n-icon>
        <cash-icon />
      </n-icon>
    </n-avatar>
  </template>
  <template v-slot:header v-if="header">
    货币
  </template>
  <template v-slot:header-extra v-if="headerExtra">
    <n-button circle size="tiny">
      <template v-slot:icon>
        <cash-icon />
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
        <cash-icon />
      </template>
      1 块钱
    </n-button>
    <n-button size="tiny" style="margin-right: 8px;">
      <template v-slot:icon>
        <cash-icon />
      </template>
      10 块钱
    </n-button>
    <n-button size="tiny">
      <template v-slot:icon>
        <cash-icon />
      </template>
      100 块钱
    </n-button>
  </template>
</n-thing>
```
```js
import { CashOutline as CashIcon } from '@vicons/ionicons-v5'

export default {
  components: {
    CashIcon
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