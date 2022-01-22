# 自定义后缀

整点不一样的！

```html
<n-space vertical>
  <n-select placeholder="选择歌曲" :options="options" v-model:show="show1">
    <template #suffix>
      <transition name="slide-left">
        <animal-rabbit28-regular v-if="show1" />
        <animal-turtle16-regular v-else />
      </transition>
    </template>
  </n-select>
  <n-select
    filterable
    placeholder="选择歌曲"
    :options="options"
    v-model:show="show2"
  >
    <template v-if="show2" #suffix>
      <md-search />
    </template>
  </n-select>
</n-space>
```

```js
import { MdSearch } from '@vicons/ionicons4'
import { AnimalTurtle16Regular, AnimalRabbit28Regular } from '@vicons/fluent'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    MdSearch,
    AnimalTurtle16Regular,
    AnimalRabbit28Regular
  },
  setup () {
    return {
      show1: ref(false),
      show2: ref(false),
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

```css
:deep(.slide-left-enter-active),
:deep(.slide-left-leave-active) {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

:deep(.slide-left-enter-from),
:deep(.slide-left-leave-to) {
  position: absolute;
  opacity: 0;
}

:deep(.slide-left-enter-from) {
  transform: translateX(-10px);
}

:deep(.slide-left-leave-to) {
  transform: translateX(10px);
}
```
