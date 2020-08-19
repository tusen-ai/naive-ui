# Group
A radio group look elegant.
```html
<n-radio-group v-model="value" name="radiogroup">
  <n-radio
    v-for="song in songs"
    :key="song.value"
    :value="song.value"
  >
    {{ song.label }}
  </n-radio>
</n-radio-group>
```
```js
export default {
  data () {
    return {
      value: null,
      songs: [
        {
          value: 'Rock\'n\'Roll Star',
          label: 'Rock\'n\'Roll Star'
        },
        {
          value: 'Shakermaker',
          label: 'Shakermaker'
        },
        {
          value: 'Live Forever',
          label: 'Live Forever'
        },
        {
          value: 'Up in the Sky',
          label: 'Up in the Sky'
        },
        {
          value: '...',
          label: '...'
        }
      ].map(s => {
        s.value = s.value.toLowerCase()
        return s
      })
    }
  }
}
```
```css
.n-radio {
  margin: 0 8px 12px 0;
}
```