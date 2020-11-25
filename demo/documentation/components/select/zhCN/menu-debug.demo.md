# Menu Debug
```html
<n-space vertical>
  <n-select
    debug
    v-model:value="value"
    :options="options"
  />
  <n-select
    v-model:value="value"
    disabled
    :options="options"
  />
  <n-select
    debug
    v-model:value="value1"
    multiple
    :options="options"
  />
  <n-select
    v-model:value="value1"
    multiple
    disabled
    :options="options"
  />
</n-space>
```
```js
export default {
  data () {
    return {
      value: 'song0',
      value1: ['song0', 'song1'],
      options: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0',
          disabled: true
        },
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
          value: 'song3',
          disabled: true
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
          value: 'song7',
          disabled: true
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
  }
}
```
