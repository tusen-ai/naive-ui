# Content Indented
Content can be indented after avatar.
```html
<n-row>
  <n-col :span="12">
    <n-checkbox v-model:checked="avatar">Avatar</n-checkbox>
  </n-col>
  <n-col :span="12">
    <n-checkbox v-model:checked="action">Action</n-checkbox>
  </n-col>
</n-row>
<n-row>
  <n-col :span="12">
    <n-checkbox v-model:checked="header">Header</n-checkbox>
  </n-col>
  <n-col :span="12">
    <n-checkbox v-model:checked="headerExtra">Header Extra</n-checkbox>
  </n-col>
</n-row>
<n-row>
  <n-col :span="12">
    <n-checkbox v-model:checked="description">Description</n-checkbox>
  </n-col>
  <n-col :span="12">
    <n-checkbox v-model:checked="footer">Footer</n-checkbox>
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
    Money
  </template>
  <template v-slot:header-extra v-if="headerExtra">
    <n-button circle size="tiny">
      <template v-slot:icon>
        <cash-icon />
      </template>
    </n-button>
  </template>
  <template v-slot:description v-if="description">
    Description
  </template>
  Money is any item or verifiable record that is generally accepted as payment for goods and services and repayment of debts, such as taxes, in a particular country or socio-economic context.
  <template v-slot:footer v-if="footer">
    Footer
  </template>
  <template v-slot:action v-if="action">
    <n-button size="tiny" style="margin-right: 8px;">
      <template v-slot:icon>
        <cash-icon />
      </template>
      1$
    </n-button>
    <n-button size="tiny" style="margin-right: 8px;">
      <template v-slot:icon>
        <cash-icon />
      </template>
      10$
    </n-button>
    <n-button size="tiny">
      <template v-slot:icon>
        <cash-icon />
      </template>
      100$
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