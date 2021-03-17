# Basic

Basic usage of modal. You can put anything in modal, a card for example.

```html
<n-button @click="showModal = true"> Start Me up </n-button>
<n-modal v-model:show="showModal">
  <n-card style="width: 600px;" title="Modal" :bordered="false" size="huge">
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
