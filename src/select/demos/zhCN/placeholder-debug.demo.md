# Placehoder Debug

```html
<n-space vertical>
  <n-select
    v-model:value="value2"
    placeholder=""
    :options="options"
    style="width:200px;"
  />
  <n-select
    v-model:value="value3"
    multiple
    placeholder=""
    :options="options"
    style="width:200px;"
  />
</n-space>
```

```js
export default {
  data () {
    return {
      options: [
        {
          value: '1',
          label: '1'
        }
      ],
      value1: null,
      value2: null,
      value3: null
    }
  }
}
```
