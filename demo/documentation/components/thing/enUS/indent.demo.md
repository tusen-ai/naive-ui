# Content Indented
Content can be indented after avatar.
```html
<n-row>
  <n-col :span="12">
    <n-checkbox v-model="avatar">Avatar</n-checkbox>
  </n-col>
  <n-col :span="12">
    <n-checkbox v-model="action">Action</n-checkbox>
  </n-col>
</n-row>
<n-row>
  <n-col :span="12">
    <n-checkbox v-model="header">Header</n-checkbox>
  </n-col>
  <n-col :span="12">
    <n-checkbox v-model="headerExtra">Header Extra</n-checkbox>
  </n-col>
</n-row>
<n-row>
  <n-col :span="12">
    <n-checkbox v-model="description">Description</n-checkbox>
  </n-col>
  <n-col :span="12">
    <n-checkbox v-model="footer">Footer</n-checkbox>
  </n-col>
</n-row>
<n-divider />
<n-thing content-indented>
  <template v-slot:avatar v-if="avatar">
    <n-avatar>
      <n-icon>
        <md-cash />
      </n-icon>
    </n-avatar>
  </template>
  <template v-slot:header v-if="header">
    Money
  </template>
  <template v-slot:header-extra v-if="headerExtra">
    <n-button circle size="tiny">
      <template v-slot:icon>
        <md-cash />
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
        <md-cash />
      </template>
      1$
    </n-button>
    <n-button size="tiny" style="margin-right: 8px;">
      <template v-slot:icon>
        <md-cash />
      </template>
      10$
    </n-button>
    <n-button size="tiny">
      <template v-slot:icon>
        <md-cash />
      </template>
      100$
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