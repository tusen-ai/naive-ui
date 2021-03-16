# Custom Position

Use fixed position to set the position of the modal.

```html
<n-button @click="showModal = true"> Start Me up </n-button>
<n-modal
  v-model:show="showModal"
  style="width: 600px; position: fixed; right: 100px; bottom: 100px;"
>
  <n-card title="Modal" :bordered="false" size="huge">
    <template #header-extra> Oops! </template>
    Content
    <template #footer> Footer </template>
  </n-card>
</n-modal>
```

```js
export default {
  data () {
    return {
      showModal: false
    }
  }
}
```
