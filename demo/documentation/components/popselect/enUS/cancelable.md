# Cancelable
Make single value popselect cancelable.
```html
<n-popselect
  v-model="value"
  cancelable
  :options="options"
>
  <n-tag>{{ value || 'popselect' }}</n-tag>
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
      this.$NMessage.info('value: ' + v)
    }
  }
}
```