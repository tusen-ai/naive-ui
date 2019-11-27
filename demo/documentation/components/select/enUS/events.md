# Events
```html
<n-select
  v-model="selectedValue"
  placeholder="Please Select Type"
  :options="options"
  @change="handleChange"
/>
<n-select
  v-model="selectedValue"
  placeholder="Please Select Type"
  :options="options"
  @change="handleChange"
  emit-option
/>
<n-select
  v-model="selectedArray"
  multiple
  placeholder="Please Select Type"
  :options="options"
  @change="handleChange"
/>
<n-select
  v-model="selectedArray"
  multiple
  placeholder="Please Select Type"
  :options="options"
/>
<n-select
  v-model="selectedValue"
  size="large"
  :options="options"
  emit-option
  @change="handleChange"
>
  <n-select-option 
    v-for="option in options"
    :key="options.value"
    :label="option.label"
    :value="option.value"
    :disabled="option.disabled"
  />
</n-select>
<n-select
  v-model="selectedArray"
  size="large"
  multiple
  :options="options"
  emit-option
  @change="handleChange"
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
    handleChange (item) {
      this.$NMessage.info('value: ' + JSON.stringify(item))
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