# Use Preset Confirm (Slot)
Slots are also related to preset.
```html
<n-button
  @click="modalActive = true"
>
  Start Me up
</n-button>
<n-modal v-model="modalActive" 
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
      modalActive: false,
    }
  }
}
```