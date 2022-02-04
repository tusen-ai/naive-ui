<markdown>
# 自定义选项渲染

经过了很久的思考，我决定放弃支持 slot API。当然，还是提供自定义渲染选项的方式。(例子中使用了 `render-label` 属性，但是你可以直接使用 `option` 的 `style` 或 `class` 选项)
</markdown>

<template>
  <n-select :options="options" :render-label="renderLabel" />
</template>

<script lang="ts">
import { defineComponent, h, VNodeChild } from 'vue'
import { NIcon, SelectOption, SelectGroupOption } from 'naive-ui'
import { MdMusicalNote as MusicIcon } from '@vicons/ionicons4'

export default defineComponent({
  setup () {
    const options: Array<SelectOption | SelectGroupOption> = [
      {
        type: 'group',
        label: 'Rubber Soul',
        key: 'Rubber Soul Album',
        children: [
          {
            label: "Everybody's Got Something to Hide Except Me and My Monkey",
            value: 'song0',
            disabled: true
          },
          {
            label: 'Drive My Car',
            value: 'song1',
            style: {
              color: 'red'
            }
          },
          {
            label: 'Norwegian Wood',
            value: 'song2'
          },
          {
            label: "You Won't See",
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
      },
      {
        type: 'group',
        label: 'Let It Be',
        key: 'Let It Be Album',
        children: [
          {
            label: 'Two Of Us',
            value: 'Two Of Us'
          },
          {
            label: 'Dig A Pony',
            value: 'Dig A Pony'
          },
          {
            label: 'Across The Universe',
            value: 'Across The Universe'
          },
          {
            label: 'I Me Mine',
            value: 'I Me Mine'
          },
          {
            label: 'Dig It',
            value: 'Dig It'
          },
          {
            label: 'Let It Be',
            value: 'Let It Be'
          },
          {
            label: 'Maggie Mae',
            value: 'Maggie Mae'
          },
          {
            label: "I've Got A Feeling",
            value: "I've Got A Feeling"
          },
          {
            label: 'One After 909',
            value: 'One After 909'
          },
          {
            label: 'The Long And Winding Road',
            value: 'The Long And Winding Road'
          },
          {
            label: 'For You Blue',
            value: 'For You Blue'
          },
          {
            label: 'Get Back',
            value: 'Get Back'
          }
        ]
      }
    ]
    return {
      renderLabel: (option: SelectOption): VNodeChild => {
        if (option.type === 'group') return option.label + '(Cool!)'
        return [
          h(
            NIcon,
            {
              style: {
                verticalAlign: '-0.15em',
                marginRight: '4px'
              }
            },
            {
              default: () => h(MusicIcon)
            }
          ),
          option.label as string
        ]
      },
      options
    }
  }
})
</script>
