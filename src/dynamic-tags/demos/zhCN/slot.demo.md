# 自定义输入或触发元素

你可以替换 `dynamic-tags` 的输入或触发元素。

```html
<n-dynamic-tags v-model:value="tags" :max="3">
  <template #input="{ submit }">
    <n-auto-complete
      size="small"
      :options="options"
      v-model:value="inputValue"
      placeholder="邮箱"
      :clear-after-select="true"
      @select="submit($event)"
    />
  </template>
  <template #trigger="{ activate, disabled }">
    <n-button
      size="small"
      @click="activate()"
      type="primary"
      dashed
      :disabled="disabled"
    >
      <template #icon>
        <n-icon>
          <Add />
        </n-icon>
      </template>
      添加
    </n-button>
  </template>
</n-dynamic-tags>
```

```js
import { defineComponent, ref, computed } from 'vue'
import { Add } from '@vicons/ionicons5'
export default defineComponent({
  components: {
    Add
  },
  setup () {
    const inputValueRef = ref('')
    const options = computed(() => {
      if (inputValueRef.value === null) {
        return []
      }
      const prefix = inputValueRef.value.split('@')[0]
      const inputSuffix = inputValueRef.value.split('@')[1]
      if (inputSuffix) {
        return [
          {
            label: prefix + '@' + inputSuffix,
            value: prefix + '@' + inputSuffix
          }
        ]
      }
      return ['@gmail.com', '@163.com', '@qq.com'].map((suffix) => {
        return {
          label: prefix + suffix,
          value: prefix + suffix
        }
      })
    })
    return {
      tags: ref(['教师', '程序员']),
      inputValue: inputValueRef,
      options
    }
  }
})
```
