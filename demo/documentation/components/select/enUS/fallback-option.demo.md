# Fallback Option

In some rare cases, you may fill the value but not the corresponding options. For example in async cases, or simply you passed a bad value. If you want to control the way of the value to be displayed, use `fallback-option` prop to control how to create a option using the value.

If you don't need fallback options, simply set it to `false`. Now only the value appeared in the options will be viewed as a valid value. Invalid values will be cleared in the operations of the component.

```html
<n-space vertical>
  <n-select v-model:value="singleValue" :options="options" />
  <n-select
    v-model:value="multipleValue"
    multiple
    :fallback-option="trim"
    :options="options"
  />
  <n-select
    v-model:value="singleValue"
    placeholder="No Fallback"
    :fallback-option="false"
    :options="options"
  />
  <n-select
    v-model:value="multipleValue"
    placeholder="No Fallback"
    multiple
    :fallback-option="false"
    :options="options"
  />
</n-space>
```

```js
export default {
  data () {
    return {
      trim (value) {
        return {
          label: value.split(' ')[0],
          value
        }
      },
      singleValue: 'A Nowhere Value',
      multipleValue: ['First Nowhere Value', 'Second Nowhere Value'],
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
          label: "You Won't See",
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
          label: "I'm looking through you",
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
