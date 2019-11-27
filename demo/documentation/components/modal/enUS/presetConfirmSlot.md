# Use Preset Confirm (Slot)
```html
<n-button
  size="small"
  @click="isActive = true"
>
  Start Me up
</n-button>
<n-modal v-model="isActive" 
  preset="confirm"
  title="Confirm"
>
  <template v-slot:header>
    <div style="color:red;">title</div>
  </template>
  <div slot="content">content</div>
  <div slot="footer">footer</div>
</n-modal>
```
```js
export default {
  data () {
    return {
      isActive: false,
    }
  }
}
```