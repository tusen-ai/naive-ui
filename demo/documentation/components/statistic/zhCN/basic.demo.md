# 基础用法
```html
<n-row>
  <n-col :span="12">
    <n-statistic label="统计数据" :value="99">
      <template v-slot:prefix>
        <n-icon>
          <md-save/>
        </n-icon>
      </template>
      <template v-slot:suffix>
        / 100
      </template>
    </n-statistic>
  </n-col>
  <n-col :span="12">
    <n-statistic label="活跃用户" value="1,234,123">
    </n-statistic>
  </n-col>
</n-row>
```

```js
import { MdSave }  from '@vicons/ionicons-v4'

export default {
  components: {
    MdSave
  }
}
```