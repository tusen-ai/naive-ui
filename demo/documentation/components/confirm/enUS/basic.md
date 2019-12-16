# Basic
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
      const confirmInstance = this.$NConfirm.open({
        title: "Confirm",
        content: "Are u sure to ...?",
        onPositiveClick: (hide) => {
          this.$NMessage.success("sure");
          hide()
        },
        onNegativeClick: (hide) => {
          this.$NMessage.error("cancel");
          hide()
        }
      });
    },
    handleSuccess (e) {
      const confirmInstance = this.$NConfirm.success({
        title: "Success",
        content:
          "Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by the Ionic Framework team.",
        onPositiveClick: (hide) => {
          this.$NMessage.success("show tooltip");
          hide()
        }
      });
    },
    handleError(e) {
      const confirmInstance = this.$NConfirm.error({
        title: "Error",
        content: "这是一个测试？",
        onPositiveClick: (hide) => {
          this.$NMessage.success("I know..");
          hide()
        }
      });
    }
  }
};
```