# Loading Bar

A kind of good placebo for anxiety.

<n-space vertical>
<n-alert title="Prerequisite" type="warning">
  If you want use loading bar, you need to wrap the component where you call related methods inside <n-text code>n-loading-bar-provider</n-text> and inject <n-text code>loadingBar</n-text>.
</n-alert>
For example:

```html
<!-- App.vue -->
<n-loading-bar-provider>
  <content />
</n-loading-bar-provider>
```

```js
// content
export default {
  inject: ['loadingBar'],
  methods: {
    loading () {
      this.loadingBar.start()
    }
  }
}
```

</n-space>

## Demos

```demo
basic
```

## API

### `loadingBar` Injection Methods

| Name   | Type                                 | Description |
| ------ | ------------------------------------ | ----------- |
| error  | `(option: LoadingBarOption) => void` |             |
| finish | `(option: LoadingBarOption) => void` |             |
| start  | `(option: LoadingBarOption) => void` |             |

#### LoadingBarOption Properties

| Name | Type | Description |
| --- | --- | --- |
| theme | `'light' \| 'dark'` | If set it will be used as the theme of loading bar. If not the theme of `n-loading-bar-provider`'s context will be used. |
