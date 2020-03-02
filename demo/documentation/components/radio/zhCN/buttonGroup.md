# 按钮组
有的时候用按钮显得更优雅一点。
```html
<div style="margin-bottom: 12px;">
  <n-radio-group v-model="value" name="radiobuttongroup">
    <n-radio-button
      v-for="song in songs"
      :key="song.value"
      :value="song.value"
      :disabled="(song.label === 'Live Forever' && disabled1 || song.label === 'Shakermaker' && disabled2)"
    >
      {{ song.label }}
    </n-radio-button>
  </n-radio-group>
</div>
<div style="margin-bottom: 12px;">
  <n-radio-group v-model="value" name="radiobuttongroup" size="medium">
    <n-radio-button
      v-for="song in songs"
      :key="song.value"
      :value="song.value"
      :disabled="(song.label === 'Live Forever' && disabled1 || song.label === 'Shakermaker' && disabled2)"
    >
      {{ song.label }}
    </n-radio-button>
  </n-radio-group>
</div>
<div style="margin-bottom: 12px;">
  <n-radio-group v-model="value" name="radiobuttongroup" size="large">
    <n-radio-button
      v-for="song in songs"
      :key="song.value"
      :value="song.value"
      :disabled="(song.label === 'Live Forever' && disabled1 || song.label === 'Shakermaker' && disabled2)"
    >
      {{ song.label }}
    </n-radio-button>
  </n-radio-group>
</div>
<n-checkbox
  v-model="disabled2"
  style="margin-right: 12px;"
>
  禁用 Shakemaker
</n-checkbox>
<n-checkbox
  v-model="disabled1"
>
  禁用 Live Forever
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