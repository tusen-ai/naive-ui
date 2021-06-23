# Prefix & Suffix

Fill content in prefix or suffix of the input.

```html
<n-space vertical>
  <n-input placeholder="Flash">
    <template #prefix>
      <n-icon>
        <flash-icon />
      </n-icon>
    </template>
  </n-input>
  <n-input round placeholder="1,400,000">
    <template #suffix>$</template>
  </n-input>
  <n-input round placeholder="Flash">
    <template #suffix>
      <n-icon>
        <flash-icon />
      </n-icon>
    </template>
  </n-input>
</n-space>
```

```js
import { FlashOutline as FlashIcon } from '@vicons/ionicons5'

export default {
  components: {
    FlashIcon
  }
}
```
