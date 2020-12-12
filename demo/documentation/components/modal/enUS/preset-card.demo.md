# Use Preset Card

Modal has some presets, which means you can use props & slots of the preset after set it.

```html
<n-button @click="modalActive = true"> Start Me up </n-button>
<n-modal
  v-model:show="modalActive"
  preset="card"
  :body-style="bodyStyle"
  title="Modal"
  :bordered="false"
  size="huge"
  :segmented="{
    content: 'soft',
    footer: 'soft'
  }"
>
  <template v-slot:header-extra> Oops! </template>
  Content
  <template v-slot:footer> Footer </template>
</n-modal>
```

```js
export default {
  data() {
    return {
      bodyStyle: {
        width: '600px'
      },
      modalActive: false
    }
  }
}
```
