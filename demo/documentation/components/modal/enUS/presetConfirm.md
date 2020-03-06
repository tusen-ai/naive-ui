# Use Preset Confirm
An example of preset `confirm`.
```html
<n-button
  @click="isActive = true"
>
  Start Me up
</n-button>
<n-modal v-model="isActive" 
  preset="confirm" 
  title="Confirm"
  content="Are you sure?" 
  :closable="false"
  positive-text="Submit"
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