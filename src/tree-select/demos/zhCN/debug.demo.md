# Debug

```html
<n-space vertical>
  <n-space>
    <n-switch v-model:value="multiple" />Multiple
    <n-switch v-model:value="checkable" />Checkable
    <n-switch v-model:value="cascade" />Cascade
    <n-switch v-model:value="filterable" />Filterable
    <n-switch v-model:value="showPath" />ShowPath
  </n-space>
  <n-tree-select
    default-expand-all
    :options="options"
    :multiple="multiple"
    :checkable="checkable"
    :cascade="cascade"
    :filterable="filterable"
    :showPath="showPath"
  />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

function createData (level = 4, baseKey = '') {
  if (!level) return undefined
  return Array.apply(null, { length: 6 - level }).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: key,
      key,
      children: createData(level - 1, key)
    }
  })
}

export default defineComponent({
  setup () {
    return {
      multiple: ref(false),
      checkable: ref(false),
      cascade: ref(false),
      filterable: ref(false),
      options: createData(),
      showPath: ref(false)
    }
  }
})
```
