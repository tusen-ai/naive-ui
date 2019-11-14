# Mask Closable
```html
<n-button
  size="small"
  @click="isActive = true"
>
  Start Me up
</n-button>
<n-modal v-model="isActive" :mask-closable="false">
  <div style="background: #5C657EFF; padding: 24px; border-radius: 8px;">
    <div>If you start me up, If you start me up, I'll never stop.</div>
    <n-input v-model="inputValue" />
    inputValue: {{ inputValue }}<br>
    <n-button
      size="small"
      @click="isActive = false"
    >
      Close it
    </n-button>
  </div>
</n-modal>
```
```js
export default {
  data () {
    return {
      isActive: false,
      inputValue: ''
    }
  }
}
```