# Use Preset Confirm
An example of preset `confirm`.
```html
<n-button
  @click="modalActive = true"
>
  Start Me up
</n-button>
<n-modal v-model:show="modalActive" 
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
  inject: ['message'],
  data () {
    return {
      modalActive: false,
    }
  },
  methods: {
    cancelCallback () {
      this.message.success('Cancel')
      this.modalActive = false
    },
    submitCallback () {
      this.message.success('Submit')
      this.modalActive = false
    }
  }
}
```