# 自定义
```html
<n-dynamic-input
  v-model="test"
  title="Add CheckBox"
  preset="custom"
  :onAdd="add"
>
  <template v-slot="slotProps">
    <div style="width:100%">
      <n-checkbox
        v-model="slotProps.item.isCheck"
        style="width: 120px;"
      />
      <n-input-number
        v-model="slotProps.item.num"
      />
      <n-input
        v-model="slotProps.item.string"
        type="input"
        size="small"
      />
    </div>
  </template>
</n-dynamic-input>
<pre>
{{  JSON.stringify(test,0,2) }}
</pre>
```
```js
export default {
  data () {
    return {
      test: [
        {
          isCheck: true,
          num: 1,
          string: 'Test string'
        }
      ]
    }
  },
  methods: {
    add (resolve) {
      resolve({
        isCheck: false,
        num: 1,
        string: 'Test string'
      })
    }
  }
}
```