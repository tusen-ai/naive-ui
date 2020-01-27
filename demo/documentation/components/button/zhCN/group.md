# 按钮组
可以把几个按钮结合成按钮组。
```html
<n-button-group>
  <n-button
    type="default"
    round
  >
    <template v-slot:icon>
      <md-save />
    </template>
    Default
  </n-button>
  <n-button
    type="primary"
    disabled
  >
    <template v-slot:icon>
      <md-save />
    </template>
    Primary
  </n-button>
  <n-button
    type="info"
    icon-placement="right"
  >
    <template v-slot:icon>
      <md-save />
    </template>
    Info
  </n-button>
  <n-button
    type="warning"
  >
    <template v-slot:icon>
      <md-save />
    </template>
    Warning
  </n-button>
</n-button-group>
<n-button-group vertical>
  <n-button
    type="default"
    round
  >
    <template v-slot:icon>
      <md-save />
    </template>
    Default
  </n-button>
  <n-button
    type="primary"
    disabled
  >
    <template v-slot:icon>
      <md-save />
    </template>
    Primary
  </n-button>
  <n-button
    type="info"
    icon-placement="right"
  >
    <template v-slot:icon>
      <md-save />
    </template>
    Info
  </n-button>
  <n-button
    type="warning"
  >
    <template v-slot:icon>
      <md-save />
    </template>
    Warning
  </n-button>
</n-button-group>
```
```js
import mdSave from 'naive-ui/lib/icons/md-save'

export default {
  components: {
    mdSave
  }
}
```
```css
.n-button {
  margin: 0 8px 8px 0;
}
```