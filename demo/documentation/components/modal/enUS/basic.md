# Basic
Basic usage of modal. You can put anything in modal, a card for example.
```html
<n-button
  size="small"
  @click="isActive = true"
>
  Start Me up
</n-button>
<n-modal v-model="isActive">
  <n-card
    style="width: 600px;"
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
  </n-card>
</n-modal>
```
```js
export default {
  data () {
    return {
      isActive: false
    }
  }
}
```