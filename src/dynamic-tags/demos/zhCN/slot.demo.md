# 插槽

自定义添加标签

```html
<n-dynamic-tags v-model:value="tags">
  <template #input="{ addTag }">
    <n-auto-complete
      size="small"
      :options="options"
      v-model:value="inputValue"
      placeholder="邮箱"
      @blur="addTag(inputValue),inputValue=''"
      @keyup.enter="addTag(inputValue),inputValue=''"
    />
  </template>
  <template #add="{ add }">
    <n-button size="small" @click="add()" type="primary" dashed>
      <template #icon>
        <n-icon>
          <Add />
        </n-icon>
      </template>
      New Tag
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
