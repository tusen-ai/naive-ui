# 直接使用
```html
<n-space :size="24" align="center" item-style="display: flex;">
  <n-badge :value="value" :max="15" />
  <n-badge :value="value" dot/>
  <n-button-group>
    <n-button @click="value = Math.min(16, value + 1)">
      <template v-slot:icon>
        <n-icon><md-add /></n-icon>
      </template>
    </n-button>
    <n-button @click="value = Math.max(0, value - 1)">
      <template v-slot:icon>
        <n-icon><md-remove /></n-icon>
      </template>
    </n-button>
  </n-button-group>
</n-space>
```
```js
import mdAdd from 'naive-ui/lib/icons/md-add.vue'
import mdRemove from 'naive-ui/lib/icons/md-remove.vue'

export default {
  components: {
    mdAdd,
    mdRemove
  },
  data () {
    return {
      value: 5
    }
  }
}
```