# Button Group
```html
<n-radio-group v-model="value">
  <n-radio-button
    v-for="song in songs"
    :key="song.value"
    :value="song.value"
    :disabled="(song.label === 'Live Forever' && disabled1 || song.label === 'Shakermaker' && disabled2)"
  >
    {{ song.label }}
  </n-radio-button>
</n-radio-group>

<n-checkbox
  v-model="disabled2"
  style="margin-right: 12px;"
>
  disable Shakemaker
</n-checkbox>
<n-checkbox
  v-model="disabled1"
>
  disable Live Forever
</n-checkbox>
```
```js
export default {
  data () {
    return {
      value: null,
      disabled2: false,
      disabled1: false,
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