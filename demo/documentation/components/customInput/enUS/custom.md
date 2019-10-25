# Custom
```html
<n-custom-input
  v-model="test1"
  title="Add CheckBox"
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
</n-custom-input>
```
```js
export default {
  data () {
    return {
      test1: [
        {
          isCheck: true
        }
      ]
    }
  }
}
```