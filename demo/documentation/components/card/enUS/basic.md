# Basic
Basic Card
```html
<n-card title="Basic" :segmented="{ content: true, extra: true }" style="width: 300px;">
  <template v-slot:cover>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573566445479&di=8804b1996cbf89582232a3994665454c&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3628555514%2C2933400515%26fm%3D214%26gp%3D0.jpg">
  </template>
  <template v-slot:header-extra>
    <n-button circle size="tiny">
      <template v-slot:icon>
        <md-code />
      </template>
    </n-button>
  </template>
  Basic Card
  <template v-slot:footer>
    May be here needs some code
  </template>
  <template v-slot:action>
    <n-button-group block>
      <n-button type="default">Decline</n-button>
      <n-button type="success">Accept</n-button>
    </n-button-group>
  </template>
</n-card>
<n-card title="Basic" :segmented="{ content: true, extra: true }" size="small"  style="width: 240px;" :bordered="false">
  <template v-slot:cover>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573566445479&di=8804b1996cbf89582232a3994665454c&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3628555514%2C2933400515%26fm%3D214%26gp%3D0.jpg">
  </template>
  <template v-slot:header-extra>
    <n-button circle size="tiny">
      <template v-slot:icon>
        <md-code />
      </template>
    </n-button>
  </template>
  Basic Card
  <template v-slot:footer>
    May be here needs some code
  </template>
  <template v-slot:action>
    <n-button-group block>
      <n-button type="default">Decline</n-button>
      <n-button type="success">Accept</n-button>
    </n-button-group>
  </template>
</n-card>
<n-card title="Basic" :segmented="{ content: true, extra: true }" size="large"  style="width: 240px;" :bordered="false">
  <template v-slot:cover>
    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573566445479&di=8804b1996cbf89582232a3994665454c&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3628555514%2C2933400515%26fm%3D214%26gp%3D0.jpg">
  </template>
  <template v-slot:header-extra>
    <n-button circle size="tiny">
      <template v-slot:icon>
        <md-code />
      </template>
    </n-button>
  </template>
  Basic Card
  <template v-slot:footer>
    May be here needs some code
  </template>
  <template v-slot:action>
    <n-button-group block>
      <n-button type="default">Decline</n-button>
      <n-button type="success">Accept</n-button>
    </n-button-group>
  </template>
</n-card>
```
```js
import mdCode from 'naive-ui/lib/icons/md-code'

export default {
  components: {
    mdCode
  }
}
```
```css
.n-card {
  max-width: 300px;
}
```