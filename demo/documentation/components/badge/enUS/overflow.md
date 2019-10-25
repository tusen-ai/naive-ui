# Overflow
Set `max` prop to handle overflow situation.
```html
<n-badge :value="value" show-zero>
  <div class="block" />
</n-badge>
<n-badge :value="value" :max="99">
  <div class="block" />
</n-badge>
<n-badge :value="value" show-zero :max="100">
  <div class="block" />
</n-badge>
<n-badge :value="value" show-zero :max="10">
  <div class="block" />
</n-badge>
<n-button-group>
  <n-button @click="value = Math.min(16, value + 1)">
    <template v-slot:icon>
      <n-icon><md-add /></n-icon>
    </template>
  </n-button>
  <n-button @click="value = Math.max(0, value - 1)" >
    <template v-slot:icon>
      <n-icon><md-remove /></n-icon>
    </template>
  </n-button>
</n-button-group>
```
```js
import mdAdd from 'naive-ui/lib/icons/md-add'
import mdRemove from 'naive-ui/lib/icons/md-remove'

export default {
  components: {
    mdAdd,
    mdRemove
  },
  data() {
    return {
      value: 101
    };
  }
};
```
```css
.n-badge {
  margin: 0 32px 8px 0;
}
.block {
  width: 32px;
  height: 32px;
  background-color: #dddddd;
  border-radius: 4px;
  transition: background-color .3s cubic-bezier(.4, 0, .2, 1);
}
.n-dark-theme .block {
  background-color: rgba(255, 255, 255, .15);
}
```