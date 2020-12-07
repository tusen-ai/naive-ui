# Change Event
Why change event is an example? Because at first there isn't much to write.
```html
<n-space vertical>
  <n-select
    v-model:value="selectedValue"
    placeholder="Please Select a Song"
    :options="options"
    @update:value="handleChange"
  />
  <n-select
    v-model:value="selectedArray"
    multiple
    placeholder="Please Select Songs"
    :options="options"
    @update:value="handleChange"
  />
</n-space>
```
```js
export default {
  inject: ['message'],
  data () {
    return {
      selectedValue: 'song1',
      selectedArray: ['song1'],
      options: [
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: 'You Won\'t See',
          value: 'song3'
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourself',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7'
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: 'I\'m looking through you',
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ]
    }
  },
  methods: {
    handleChange (value) {
      this.message.info('value: ' + JSON.stringify(value))
    }
  }
}
```
