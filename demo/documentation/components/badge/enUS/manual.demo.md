# Controlled Display
```html
<div class="badge-demo">
  <n-badge :value="value" :max="15" :show="show">
    <n-avatar />
  </n-badge>
  <n-badge :value="value" dot :show="show">
    <n-avatar />
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
  <n-switch v-model="show"/>
</div>
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
      value: 5,
      show: true
    };
  }
};
```
```css
.n-badge {
  margin: 0 32px 0px 0;
}
.badge-demo {
  display: flex;
  align-items: center;
}
```