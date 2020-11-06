# Custom Input Content
```html
<n-dynamic-input
  v-model:value="customValue"
  :on-create="onCreate"
>
  <template v-slot="{ value }">
    <div style="width: 100%;">
      <div style="display: flex; align-items: center;">
        <n-checkbox
          v-model:checked="value.isCheck"
          style="margin-right: 12px;"
        />
        <n-input-number
          v-model:value="value.num"
          style="margin-right: 12px; width: 160px;"
        />
        <n-input
          v-model:value="value.string"
          type="input"
        />
      </div>
    </div>
  </template>
</n-dynamic-input>
<pre>
{{  JSON.stringify(customValue, 0, 2) }}
</pre>
```
```js
export default {
  data () {
    return {
      customValue: [
        {
          isCheck: true,
          num: 1,
          string: 'A String'
        }
      ]
    }
  },
  methods: {
    onCreate () {
      return {
        isCheck: false,
        num: 1,
        string: 'A String'
      }
    },
    onClear () {
      return {
        isCheck: false,
        num: 0,
        string: ''
      }
    }
  }
}
```