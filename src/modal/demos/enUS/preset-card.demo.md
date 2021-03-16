# Use Preset Card

Modal has some presets, which means you can use props & slots of the preset after set it.

```html
<n-button @click="showModal = true"> Start Me up </n-button>
<n-modal
  v-model:show="showModal"
  preset="card"
  :style="bodyStyle"
  title="Modal"
  :bordered="false"
  size="huge"
  :segmented="{
    content: 'soft',
    footer: 'soft'
  }"
>
  <template #header-extra> Oops! </template>
  Content
  <template #footer> Footer </template>
</n-modal>
```

```js
export default {
  data () {
    return {
      bodyStyle: {
        width: '600px'
      },
      showModal: false
    }
  }
}
```
