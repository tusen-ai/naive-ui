# Basic

```html
<n-page-header
  subtitle="Make your hearing sense better understand vision."
  @back="handleBack"
>
  <n-grid :cols="5">
    <n-gi>
      <n-statistic label="Episode" value="125" />
    </n-gi>
    <n-gi>
      <n-statistic label="Guests" value="22" />
    </n-gi>
    <n-gi>
      <n-statistic label="Applogies" value="36" />
    </n-gi>
    <n-gi>
      <n-statistic label="Topics" value="83" />
    </n-gi>
    <n-gi>
      <n-statistic label="Reference Links" value="2,346" />
    </n-gi>
  </n-grid>
  <template #title>
    <a href="https://anyway.fm/" style="text-decoration: none; color: inherit;"
      >Anyway.FM</a
    >
  </template>
  <template #header>
    <n-breadcrumb>
      <n-breadcrumb-item>Podcast</n-breadcrumb-item>
      <n-breadcrumb-item>Best Collection</n-breadcrumb-item>
      <n-breadcrumb-item>Ultimate Best Collection</n-breadcrumb-item>
      <n-breadcrumb-item>Anyway.FM</n-breadcrumb-item>
    </n-breadcrumb>
  </template>
  <template #avatar>
    <n-avatar
      src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
    />
  </template>
  <template #extra>
    <n-space>
      <n-button>Urge Update</n-button>
      <n-dropdown :options="options" placement="bottom-start">
        <n-button :bordered="false" style="padding: 0 4px">···</n-button>
      </n-dropdown>
    </n-space>
  </template>
  <template #footer>As of April 3, 2021</template>
</n-page-header>
```

```js
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import { EllipsisHorizontal } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    EllipsisHorizontal
  },
  setup () {
    const message = useMessage()
    return {
      handleBack () {
        message.info('[onBack]')
      },
      options: [
        {
          label: 'Urge Update',
          key: '1'
        },
        {
          label: 'Urge Update',
          key: '2'
        },
        {
          label: 'Urge Update',
          key: '3'
        }
      ]
    }
  }
})
```
