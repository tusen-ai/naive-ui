# Manually control display
```html
<div class="demo">
  <n-badge :value="value" :max="15" :show="show">
    <n-icon type="ios-alarm" :size="24" />
  </n-badge>
  <n-badge :value="value" dot :show="show">
    <n-icon type="ios-alarm" :size="24" />
  </n-badge>
  <n-button-group>
    <n-button icon="md-add" @click="value += 1" />
    <n-button icon="md-remove" @click="value = Math.max(0, value - 1)" />
  </n-button-group>
  <n-switch v-model="show"/>
</div>
```
```js
export default {
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
.demo {
  display: flex;
  align-items: center;
}
.n-button-group {
  margin: 0 12px 0 0;
}
```