# Basic
Inject `dialog` to create a dialog.
```html
<n-button @click="handleConfirm">
  Confirm
</n-button>
<n-button @click="handleSuccess">
  Success
</n-button>
<n-button @click="handleError">
  Error
</n-button>
```
```css
.n-button {
  margin: 0 12px 8px 0;
}
```
```js
export default {
  inject: [
    'dialog',
    'message'
  ],
  methods: {
    handleConfirm (e) {
      const confirmInstance = this.dialog.warning({
        title: 'Confirm',
        content: 'Are you sure?',
        positiveText: 'Sure',
        negativeText: 'Not Sure',
        onPositiveClick: () => {
          this.message.success('Sure')
        },
        onNegativeClick: () => {
          this.message.error('Not Sure')
        }
      })
    },
    handleSuccess (e) {
      const confirmInstance = this.dialog.success({
        title: 'Success',
        content:
          'Cool',
        positiveText: 'Wow!',
        onPositiveClick: () => {
          this.message.success('Great!')
        }
      })
    },
    handleError(e) {
      const confirmInstance = this.dialog.error({
        title: 'Error',
        content: 'A mistake.',
        positiveText: 'Ahhh!',
        onPositiveClick: () => {
          this.message.success('I knew it...')
        }
      })
    }
  }
}
```