# Basic
Use `$NConfirm` to create a confirm modal.
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
  methods: {
    handleConfirm (e) {
      const confirmInstance = this.$NConfirm.warning({
        title: 'Confirm',
        content: 'Are you sure?',
        positiveText: 'Sure',
        negativeText: 'Not Sure',
        onPositiveClick: () => {
          this.$NMessage.success('Sure')
        },
        onNegativeClick: () => {
          this.$NMessage.error('Not Sure')
        }
      })
    },
    handleSuccess (e) {
      const confirmInstance = this.$NConfirm.success({
        title: 'Success',
        content:
          'Cool',
        positiveText: 'Wow!',
        onPositiveClick: () => {
          this.$NMessage.success('Great!')
        }
      })
    },
    handleError(e) {
      const confirmInstance = this.$NConfirm.error({
        title: 'Error',
        content: 'A mistake.',
        positiveText: 'Ahhh!',
        onPositiveClick: () => {
          this.$NMessage.success('I knew it...')
        }
      })
    }
  }
}
```