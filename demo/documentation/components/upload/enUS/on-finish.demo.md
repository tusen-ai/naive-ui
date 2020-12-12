# Change File on Finish

You can change file's property when upload finishes.

```html
<n-upload
  @finish="handleFinish"
  action="http://www.mocky.io/v2/5e4bafc63100007100d8b70f"
>
  <n-button>Upload</n-button>
</n-upload>
```

```js
export default {
  methods: {
    handleFinish ({ file }) {
      file.url = 'http://www.mocky.io/v2/5e4bafc63100007100d8b70f'
    }
  }
}
```
