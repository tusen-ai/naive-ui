# Loading

Use `n-skeleton` to simulate loading effect.

```html
<n-space vertical>
  <n-switch v-model:value="loading" />
  <n-card>
    <template #header>
      <n-skeleton text v-if="loading" width="60%" />
      <template v-else>Lorem Ipsum</template>
    </template>
    <n-skeleton text v-if="loading" :repeat="6" />
    <template v-else>
      Lorem ipsum dolor sit amet,<br />
      consectetur adipiscing elit,<br />
      sed do eiusmod tempor incididunt<br />
      ut labore et dolore magna aliqua.<br />
      Ut enim ad minim veniam,<br />
      quis nostrud exercitation ullamco
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
