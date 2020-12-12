# debug

Debug 用的。

```html
<div
  class="debug-zone"
  n-light-theme-background-color-hint="#ececec"
  n-dark-theme-background-color-hint="transparent"
>
  <n-button type="default" round>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Default
  </n-button>
  <n-button type="primary" disabled>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Primary
  </n-button>
  <n-button type="info" icon-placement="right">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Info
  </n-button>
  <n-button type="warning">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Warning
  </n-button>
  <n-button type="success">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Success
  </n-button>
  <n-button type="error">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Error
  </n-button>
  <n-button type="default" ghost>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Default
  </n-button>
  <n-button type="primary" ghost round>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Primary
  </n-button>
  <n-button type="info" ghost disabled>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Info
  </n-button>
  <n-button type="warning" ghost icon-placement="right">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Warning
  </n-button>
  <n-button type="success" ghost>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Success
  </n-button>
  <n-button type="error" ghost>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Error
  </n-button>
  <n-button type="default" loading>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Default
  </n-button>
  <n-button type="primary" loading>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Primary
  </n-button>
  <n-button type="info" loading round>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Info
  </n-button>
  <n-button type="warning" loading disabled>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Warning
  </n-button>
  <n-button type="success" loading icon-placement="right">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Success
  </n-button>
  <n-button type="error" loading>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Error
  </n-button>
  <n-button type="default" ghost loading>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Default
  </n-button>
  <n-button type="primary" ghost loading>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Primary
  </n-button>
  <n-button type="info" ghost loading>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Info
  </n-button>
  <n-button type="warning" ghost loading round>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Warning
  </n-button>
  <n-button type="success" ghost loading disabled>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Success
  </n-button>
  <n-button type="error" ghost loading icon-placement="right">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Error
  </n-button>
  <n-button type="default" round block>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Default
  </n-button>
  <n-button type="primary" disabled block size="small">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Primary
  </n-button>
  <n-button type="info" icon-placement="right" block size="large">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Info
  </n-button>
  <n-button type="warning" block ghost>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Warning
  </n-button>
  <n-button type="success" block loading>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Success
  </n-button>
  <n-button type="error" block>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Error
  </n-button>
  <n-button type="primary" disabled circle size="small">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Primary
  </n-button>
  <n-button type="info" icon-placement="right" circle size="large">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Info
  </n-button>
  <n-button type="warning" circle ghost>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Warning
  </n-button>
  <n-button type="success" circle loading>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Success
  </n-button>
  <n-button type="error" circle>
    <template v-slot:icon>
      <cash-outline />
    </template>
    Error
  </n-button>
  <n-button type="error">
    <template v-slot:icon>
      <cash-outline />
    </template>
    Error
  </n-button>
  <n-button type="error" size="large">
    <template v-slot:icon>
      <cash-outline />
    </template>
  </n-button>
  <n-button type="error" round size="large">
    <template v-slot:icon>
      <cash-outline />
    </template>
  </n-button>
  <n-button-group>
    <n-button type="default" round>
      <template v-slot:icon>
        <cash-outline />
      </template>
      Default
    </n-button>
    <n-button type="primary" disabled>
      <template v-slot:icon>
        <cash-outline />
      </template>
      Primary
    </n-button>
    <n-button type="info" icon-placement="right">
      <template v-slot:icon>
        <cash-outline />
      </template>
      Info
    </n-button>
    <n-button type="warning">
      <template v-slot:icon>
        <cash-outline />
      </template>
      Warning
    </n-button>
  </n-button-group>
  <n-button-group vertical>
    <n-button type="default" round>
      <template v-slot:icon>
        <cash-outline />
      </template>
      Default
    </n-button>
    <n-button type="primary" disabled>
      <template v-slot:icon>
        <cash-outline />
      </template>
      Primary
    </n-button>
    <n-button type="info" icon-placement="right">
      <template v-slot:icon>
        <cash-outline />
      </template>
      Info
    </n-button>
    <n-button type="warning">
      <template v-slot:icon>
        <cash-outline />
      </template>
      Warning
    </n-button>
  </n-button-group>
  <n-button text type="info" loading size="small" disabled>Info</n-button>
  <n-button text type="success">Success</n-button>
  <n-button text type="warning">Warning</n-button>
  <n-button text type="error" icon-placement="right">
    <template v-slot:icon>
      <n-icon>
        <cash-outline />
      </n-icon>
    </template>
    Error
  </n-button>
  <n-button-group vertical>
    <n-button type="primary" round>
      <template v-slot:icon>
        <log-in-outline />
      </template>
      活着
    </n-button>
    <n-button type="warning" ghost>
      <template v-slot:icon>
        <log-in-outline />
      </template>
      不多
    </n-button>
    <n-button type="error">
      <template v-slot:icon>
        <log-in-outline />
      </template>
      不少
    </n-button>
  </n-button-group>
  <n-button-group vertical size="large">
    <n-button type="success">
      <template v-slot:icon>
        <log-in-outline />
      </template>
      幸福
    </n-button>
    <n-button type="info">
      <template v-slot:icon>
        <log-in-outline />
      </template>
      刚好
    </n-button>
    <n-button type="error" ghost round>
      <template v-slot:icon>
        <log-in-outline />
      </template>
      够用
    </n-button>
  </n-button-group>
  <n-button-group size="small">
    <n-button type="default" round>
      <template v-slot:icon>
        <log-in-outline />
      </template>
      活着
    </n-button>
    <n-button type="default">
      <template v-slot:icon>
        <log-in-outline />
      </template>
      其实
    </n-button>
    <n-button type="default">
      <template v-slot:icon>
        <log-in-outline />
      </template>
      很好
    </n-button>
  </n-button-group>
  <n-button-group>
    <n-button type="primary" ghost>
      <template v-slot:icon>
        <log-in-outline />
      </template>
      再吃
    </n-button>
    <n-button ghost type="primary">
      <template v-slot:icon>
        <log-in-outline />
      </template>
      一颗
    </n-button>
    <n-button type="info" round>
      <template v-slot:icon>
        <log-in-outline />
      </template>
      苹果
    </n-button>
  </n-button-group>
</div>
```

```js
import { LogInOutline, CashOutline } from '@vicons/ionicons-v5'

export default {
  components: {
    CashOutline,
    LogInOutline
  }
}
```

```css
.n-button {
  margin-right: 12px;
  margin-bottom: 8px;
}
.debug-zone {
  border-radius: 4px;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;
}
.n-light-theme {
  .debug-zone {
    border-radius: 4px;
    background-color: #ececec;
  }
}
```
