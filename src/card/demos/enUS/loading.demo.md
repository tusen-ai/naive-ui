# Loading

Use `n-skeleton` to simulate loading effect.

```html
<n-space vertical>
  <n-switch v-model:value="loading" />
  <n-card>
    <template #header>
      <n-skeleton text v-if="loading" width="60%" />
      <template v-else>I'm OK</template>
    </template>
    <n-skeleton text v-if="loading" :repeat="6" />
    <template v-else>
      Please leave you name,<br />
      number and other things.<br />
      Don't say too fast that me can't write done your name.<br />
      Maybe you won't call again.<br />
      However I waited till my hair got white.<br />
      Hope someday you'll call me again.
    </template>
  </n-card>
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      loading: ref(true)
    }
  }
})
```
