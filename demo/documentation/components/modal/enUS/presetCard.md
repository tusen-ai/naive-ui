# Use Preset Card
Modal has some presets, which means you can use props & slots of the preset after set it.
```html
<n-button
  @click="isActive = true"
>
  Start Me up
</n-button>
<n-modal
  v-model="isActive"
  preset="card"
  overlay-style="width: 600px;"
  title="Modal"
  :bordered="false"
  size="huge"
  :segmented="{
    content: 'soft',
    footer: 'soft'
  }"
>
  <template v-slot:header-extra>
    Oops!
  </template>
  Content
  <template v-slot:footer>
    Footer
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