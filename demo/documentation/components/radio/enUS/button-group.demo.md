# Button Group
Sometimes a radio button group looks more elegant.
```html
<n-space vertical>
  <n-radio-group v-model:value="value" name="radiobuttongroup1">
    <n-radio-button
      v-for="song in songs"
      :key="song.value"
      :value="song.value"
      :disabled="(song.label === 'Live Forever' && disabled1 || song.label === 'Shakermaker' && disabled2)"
    >
      {{ song.label }}
    </n-radio-button>
  </n-radio-group>
  <n-space>
    <n-checkbox
      v-model:value="disabled2"
      style="margin-right: 12px;"
    >
      Disable Shakemaker
    </n-checkbox>
    <n-checkbox
      v-model:value="disabled1"
    >
      Disable Live Forever
    </n-checkbox>
  </n-space>
</n-space>
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