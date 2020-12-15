# Basic

Inject `dialog` to create a dialog.

```html
<n-button @click="handleConfirm"> Confirm </n-button>
<n-button @click="handleSuccess"> Success </n-button>
<n-button @click="handleError"> Error </n-button>
```

```js
export default {
  inject: ['dialog', 'message'],
  methods: {
    handleConfirm (e) {
      this.dialog.warning({
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
      this.dialog.success({
        title: 'Success',
        content: 'Cool',
        positiveText: 'Wow!',
        onPositiveClick: () => {
          this.message.success('Great!')
        }
      })
    },
    handleError (e) {
      this.dialog.error({
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
