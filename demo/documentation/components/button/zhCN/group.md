# 按钮组
可以把几个按钮结合成按钮组。
```html
<n-button-group vertical>
  <n-button
    type="primary"
    round
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    活着
  </n-button>
  <n-button
    type="warning"
    ghost
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    不多
  </n-button>
  <n-button
    type="error"
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    不少
  </n-button>
</n-button-group>
<n-button-group vertical size="large">
  <n-button
    type="success"
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    幸福
  </n-button>
  <n-button
    type="info"
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    刚好
  </n-button>
  <n-button
    type="error"
    ghost
    round
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    够用
  </n-button>
</n-button-group>
<n-button-group size="small">
  <n-button
    type="default"
    round
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    活着
  </n-button>
  <n-button
    type="default"
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    其实
  </n-button>
  <n-button
    type="default"
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    很好
  </n-button>
</n-button-group>
<n-button-group>
  <n-button
    type="primary"
    ghost
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    再吃
  </n-button>
  <n-button
    ghost
    type="primary"
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    一颗
  </n-button>
  <n-button
    type="info"
    round
  >
    <template v-slot:icon>
      <log-in-outline />
    </template>
    苹果
  </n-button>
</n-button-group>
```
```js
import logInOutline from 'naive-ui/lib/icons/log-in-outline'

export default {
  components: {
    logInOutline
  }
}
```
```css
.n-button-group {
  margin: 0 12px 12px 0;
}
```