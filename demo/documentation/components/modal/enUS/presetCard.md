# Use Preset Card
```html
<n-button
  size="small"
  @click="isActive = true"
>
  Start Me up
</n-button>
<n-modal
  v-model="isActive"
  preset="card"
  body-style="width: 600px;"
  title="Modal"
  :bordered="false"
  size="huge"
  :segmented="{
    header: 'soft',
    content: 'soft'
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