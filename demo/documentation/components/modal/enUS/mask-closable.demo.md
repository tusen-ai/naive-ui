# Mask Closable

Use `mask-closable=false` to make modal not emit the event which may close the modal.

```html
<n-button @click="modalActive = true"> Start Me up </n-button>
<n-modal
  v-model:show="modalActive"
  :mask-closable="false"
  preset="confirm"
  title="Dialog"
  content="Are you sure?"
  :closable="false"
  positive-text="Confirm"
  @positive-click="submitCallback"
  @negative-click="cancelCallback"
  negative-text="Cancel"
/>
```

```js
export default {
  inject: ['message'],
  data() {
    return {
      modalActive: false
    }
  },
  methods: {
    cancelCallback() {
      this.message.success('Cancel')
      this.modalActive = false
    },
    submitCallback() {
      this.message.success('Submit')
      this.modalActive = false
    }
  }
}
```
