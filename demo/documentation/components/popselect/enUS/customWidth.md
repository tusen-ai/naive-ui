# Custom Width

Set width of select menu.

```html
<n-popselect
  v-model="value"
  :width="240"
  multiple
  :options="options"
  @change="handleChange"
>
  <n-tag>{{ (Array.isArray(value) && value.length) ? value : 'Popselect' }}</n-tag>
</n-popselect>
```
```js
export default {
  data () {
    return {
      value: null,
      options: [{
        label: 'Go Let It Out',
        value: 'Go Let It Out'
      }, {
        label: 'Who Feels Love?',
        value: 'Who Feels Love?'
      }, {
        label: 'Sunday Morning Call',
        value: 'Sunday Morning Call',
        disabled: true
      }, {
        label: 'Roll It Over',
        value: 'Roll It Over'
      }]
    }
  },
  methods: {
    handleChange (v) {
      this.$NMessage.info('Value: ' + v)
    }
  }
}
```