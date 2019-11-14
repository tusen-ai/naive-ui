# Confirm Basic
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
  submit-text="submit"
  @cancel="cancelCallback"
  @submit="submitCallback"
  cancel-text="cancel">
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