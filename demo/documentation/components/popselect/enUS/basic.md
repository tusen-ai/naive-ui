# Basic

Basic usage of popselect.

```html
<n-popselect
  v-model="value"
  :options="options"
  @change="handleChange"
>
  <n-tag>{{ value || 'popselect' }}</n-tag>
</n-popselect>
```
```js
export default {
  data () {
    return {
      value: 'Sunday Morning Call1',
      options: [{
        label: 'Go Let It Out1',
        value: 'Go Let It Out1'
      }, {
        label: 'Who Feels Love?1',
        value: 'Who Feels Love?1'
      }, {
        label: 'Sunday Morning Call1',
        value: 'Sunday Morning Call1',
        disabled: true
      }, {
        label: 'Roll It Over1',
        value: 'Roll It Over1'
      },
      {
        label: 'Go Let It Out2',
        value: 'Go Let It Out2'
      }, {
        label: 'Who Feels Love?2',
        value: 'Who Feels Love?2'
      }, {
        label: 'Sunday Morning Call2',
        value: 'Sunday Morning Call2',
        disabled: true
      }, {
        label: 'Roll It Over2',
        value: 'Roll It Over2'
      }, {
        label: 'Go Let It Out3',
        value: 'Go Let It Out3'
      }, {
        label: 'Who Feels Love?3',
        value: 'Who Feels Love?3'
      }, {
        label: 'Sunday Morning Call3',
        value: 'Sunday Morning Call3',
        disabled: true
      }, {
        label: 'Roll It Over3',
        value: 'Roll It Over3'
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