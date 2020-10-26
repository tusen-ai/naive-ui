# 按钮组
可以把几个按钮结合成按钮组。
```html
<n-space>
  <n-button-group vertical>
    <n-button
      round
    >
      <template v-slot:icon>
        <log-in-icon />
      </template>
      活着
    </n-button>
    <n-button
      ghost
    >
      <template v-slot:icon>
        <log-in-icon />
      </template>
      不多
    </n-button>
    <n-button>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      不少
    </n-button>
  </n-button-group>
  <n-button-group vertical size="large">
    <n-button>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      幸福
    </n-button>
    <n-button>
      <template v-slot:icon>
        <log-in-icon />
      </template>
      刚好
    </n-button>
    <n-button
      ghost
      round
    >
      <template v-slot:icon>
        <log-in-icon />
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
        <log-in-icon />
      </template>
      活着
    </n-button>
    <n-button
      type="default"
    >
      <template v-slot:icon>
        <log-in-icon />
      </template>
      其实
    </n-button>
    <n-button
      type="default"
    >
      <template v-slot:icon>
        <log-in-icon />
      </template>
      很好
    </n-button>
  </n-button-group>
  <n-button-group>
    <n-button
      ghost
    >
      <template v-slot:icon>
        <log-in-icon />
      </template>
      再吃
    </n-button>
    <n-button
      ghost
    >
      <template v-slot:icon>
        <log-in-icon />
      </template>
      一颗
    </n-button>
    <n-button
      round
    >
      <template v-slot:icon>
        <log-in-icon />
      </template>
      苹果
    </n-button>
  </n-button-group>
</n-space>
```
```js
import LogInIcon from 'naive-ui/lib/icons/log-in-outline'

export default {
  components: {
    LogInIcon
  }
}
```
