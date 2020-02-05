# Use Preset Confirm (Slot)
Slots are also related to preset.
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
    <div>title</div>
  </template>
  <template v-slot:content>
    <div>content</div>
  </template>
  <template v-slot:action>
    <div>action</div>
  </template>
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