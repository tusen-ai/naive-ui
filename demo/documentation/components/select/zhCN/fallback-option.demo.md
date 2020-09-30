# 回退选项
在某些特殊的情况下，你会填入值但是还没填入对应的选项，例如异步，或者你填错了。如果你想控制在这种情况下选项如何显示，使用 `fallback-option` 属性来控制如何用这个值产生一个选项。

如果你不需要回退选项，将 `fallback-option` 设为 `false` 即可，这时只有出现在选项中的值才会被视为合法值，在操作的过程中不合法的值会被清除掉。
```html
<n-select
  v-model:value="singleValue"
  :options="options"
/>
<n-select
  v-model:value="multipleValue"
  multiple
  :fallback-option="trim"
  :options="options"
/>
<n-select
  v-model:value="singleValue"
  placeholder="无回退选项"
  :fallback-option="false"
  :options="options"
/>
<n-select
  v-model:value="multipleValue"
  placeholder="无回退选项"
  multiple
  :fallback-option="false"
  :options="options"
/>
```
```js
export default {
  data () {
    return {
      trim (value) {
        return {
          label: value.slice(0, 2),
          value
        }
      },
      singleValue: '一个不知哪里来的值',
      multipleValue: ['一个不知哪里来的值', '两个不知哪里来的值'],
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