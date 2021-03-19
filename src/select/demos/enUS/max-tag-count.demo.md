# Max Tag Count

You can use a fixed number or use `responsive` to set a responsive max count.

```html
<n-space vertical>
  <n-select
    placeholder="maxTagCount = responsive"
    v-model:value="value"
    multiple
    :options="options"
    max-tag-count="responsive"
  />
  <n-select
    placeholder="maxTagCount = 3"
    v-model:value="value"
    multiple
    :options="options"
    :max-tag-count="3"
  />
</n-space>
```

```js
export default {
  data () {
    return {
      value: null,
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
