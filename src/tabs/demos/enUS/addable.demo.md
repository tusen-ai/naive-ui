# Addable

Add some tabs. Only work with `'card'` type.

```html
<n-tabs
  v-model:value="value"
  type="card"
  :addable="addable"
  :closable="closable"
  @close="handleClose"
  @add="handleAdd"
  tab-style="min-width: 80px;"
>
  <n-tab-pane v-for="panel in panels" :name="panel" :key="panel">
    {{ panel }}
  </n-tab-pane>
  <template #prefix>Prefix</template>
  <template #suffix>Suffix</template>
</n-tabs>
```

```js
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  setup () {
    const valueRef = ref(1)
    const panelsRef = ref([1, 2, 3, 4, 5])
    const addableRef = computed(() => {
      return {
        disabled: panelsRef.value.length >= 10
      }
    })
    const closableRef = computed(() => {
      return panelsRef.value.length > 1
    })
    return {
      value: valueRef,
      panels: panelsRef,
      addable: addableRef,
      closable: closableRef,
      handleAdd () {
        const newValue = Math.max(...panelsRef.value) + 1
        panelsRef.value.push(newValue)
        valueRef.value = newValue
      },
      handleClose (name) {
        const { value: panels } = panelsRef
        const nameIndex = panels.findIndex((panelName) => panelName === name)
        if (!~nameIndex) return
        panels.splice(nameIndex, 1)
        if (name === valueRef.value) {
          valueRef.value = panels[Math.min(nameIndex, panels.length - 1)]
        }
      }
    }
  }
})
```
