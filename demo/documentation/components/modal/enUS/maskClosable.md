# Mask Closable
You can make mask click not to close modal when using v-model on modal.
```html
<n-button
  @click="isActive = true"
>
  Start Me up
</n-button>
<n-modal
  v-model="isActive" 
  :mask-closable="false"
  preset="confirm" 
  title="Confirm"
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
  data () {
    return {
      isActive: false,
    }
  },
  methods: {
    cancelCallback () {
      this.$NMessage.success('Cancel')
      this.isActive = false
    },
    submitCallback () {
      this.$NMessage.success('Submit')
      this.isActive = false
    }
  }
}
```