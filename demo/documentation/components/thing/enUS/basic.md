# Basic
```html
<n-thing>
  <template v-slot:avatar>
    <n-avatar>
      <n-icon>
        <md-cash />
      </n-icon>
    </n-avatar>
  </template>
  <template v-slot:header>
    Money
  </template>
  <template v-slot:header-extra>
    <n-button circle size="tiny">
      <template v-slot:icon>
        <md-cash />
      </template>
    </n-button>
  </template>
  <template v-slot:description>
    It is what I want.
  </template>
  Money is any item or verifiable record that is generally accepted as payment for goods and services and repayment of debts, such as taxes, in a particular country or socio-economic context.
  <template v-slot:footer>
    The King of Money
  </template>
  <template v-slot:action>
    <n-button size="tiny" style="margin-right: 8px;">
      <template v-slot:icon>
        <md-cash />
      </template>
      Add 1$
    </n-button>
    <n-button size="tiny" style="margin-right: 8px;">
      <template v-slot:icon>
        <md-cash />
      </template>
      Add 10$
    </n-button>
    <n-button size="tiny">
      <template v-slot:icon>
        <md-cash />
      </template>
      Add 100$
    </n-button>
  </template>
</n-thing>
```
```js
import mdCash from 'naive-ui/lib/icons/md-cash'

export default {
  components: {
    mdCash
  }
}
```