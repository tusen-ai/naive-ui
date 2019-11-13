# Multiple Select
```html
<n-select
  v-model="value"
  multiple
  :options="options"
/>
<n-select
  v-model="value"
  multiple
  disabled
  :options="options"
/>
<n-select
  v-model="value"
  multiple
  size="small"
  :options="options"
/>
<n-select
  v-model="value"
  multiple
  size="large"
  :options="options"
/>
<n-select
  v-model="value"
  size="large"
  multiple
  :options="options"
>
  <n-select-option 
    v-for="option in options"
    :key="options.value"
    :label="option.label"
    :value="option.value"
    :disabled="option.disabled"
  />
</n-select>
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
```css
.n-select {
  width: 180px;
  margin: 0 12px 8px 0;
}
```