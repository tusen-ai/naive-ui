# Filterable
```html
<n-select
  v-model="selectedValue"
  filterable
  placeholder="Please Select Type"
  :options="options"
/>
<n-select
  v-model="selectedValues"
  multiple
  filterable
  placeholder="Please Select Type"
  :options="options"
/>
```
```js
export default {
  data () {
    return {
      selectedValue: null,
      selectedValues: null,
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
  }
}
```
```css
.n-select {
  width: 180px;
  margin: 0 12px 8px 0;
}
```