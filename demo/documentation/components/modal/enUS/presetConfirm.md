# Use Preset Confirm
```html
<n-button
  size="small"
  @click="isActive = true"
>
  Start Me up
</n-button>
<n-modal v-model="isActive" 
  preset="confirm" 
  title="Confirm modal"
  content="Are you sure ?" 
  :closable="false"
  positive-text="submit"
  @positive-click="cancelCallback"
  @negative-click="submitCallback"
  negative-text="cancel">
</n-modal>
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
      this.$NMessage.success('cancel')
      this.isActive = false
    },
    submitCallback () {
      this.$NMessage.success('submit')
      this.isActive = false
    }
  }
}
```