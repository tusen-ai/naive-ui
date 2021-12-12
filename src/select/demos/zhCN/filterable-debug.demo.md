# Filterable debug

```html
<n-space vertical>
  <n-select
    v-model:value="selectedValue"
    style="width: 200px;"
    filterable
    placeholder="选择歌曲"
    :consistent-menu-width="false"
    :options="options"
  />
  <n-select
    v-model:value="selectedValues"
    style="width: 200px;"
    multiple
    filterable
    placeholder="选择歌曲"
    :consistent-menu-width="false"
    :options="options"
  />
</n-space>
```

```js
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    return {
      selectedValue: ref('song1'),
      selectedValues: ref(['song1']),
      options: [
        {
          label:
            'Drive My Carfehjuwagheiuwhfiuawgheiawufhiuawghueiwahfaiuwgewiuafhw',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: "You Won't See",
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
})
```
