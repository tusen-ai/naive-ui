# Use Preset Dialog

An example of preset `dialog`.

```html
<n-button @click="modalActive = true"> Start Me up </n-button>
<n-modal
  v-model:show="modalActive"
  preset="confirm"
  title="Dialog"
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
      modalActive: false
    }
  },
  methods: {
    cancelCallback () {
      this.message.success('Cancel')
    },
    submitCallback () {
      this.message.success('Submit')
    }
  }
}
```
