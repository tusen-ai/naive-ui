# Async
```html
<n-button @click="handleClick">
  Success
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
    handleClick (e) {
      const confirmInstance = this.$NModal.success({
        title: "Success",
        content:
          "Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by the Ionic Framework team.",
        onPositiveClick: (hide) => {
          this.$NMessage.success("count down 1 second");
          window.setTimeout(hide, 1000)
        }
      });
    }
  }
};
```