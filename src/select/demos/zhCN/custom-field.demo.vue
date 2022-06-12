<markdown>
# 自定义字段

后端会传来各种各样的数据。
</markdown>

<template>
  <n-space vertical>
    <n-select
      label-field="whateverLabel"
      value-field="whateverValue"
      children-field="whateverChildren"
      filterable
      :options="options"
    />
    <n-select
      label-field="whateverLabel"
      value-field="whateverValue"
      children-field="whateverChildren"
      filterable
      multiple
      :options="options"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { SelectOption, SelectGroupOption } from 'naive-ui'

export default defineComponent({
  setup () {
    const options: Array<SelectOption | SelectGroupOption> = [
      {
        type: 'group',
        whateverLabel: 'Rubber Soul',
        key: 'Rubber Soul',
        whateverChildren: [
          {
            whateverLabel:
              "Everybody's Got Something to Hide Except Me and My Monkey",
            whateverValue: 'song0',
            disabled: true
          },
          {
            whateverLabel: 'Drive My Car',
            whateverValue: 'song1'
          },
          {
            whateverLabel: 'Norwegian Wood',
            whateverValue: 'song2'
          },
          {
            whateverLabel: "You Won't See",
            whateverValue: 'song3',
            disabled: true
          },
          {
            whateverLabel: 'Nowhere Man',
            whateverValue: 'song4'
          },
          {
            whateverLabel: 'Think For Yourself',
            whateverValue: 'song5'
          },
          {
            whateverLabel: 'The Word',
            whateverValue: 'song6'
          },
          {
            whateverLabel: 'Michelle',
            whateverValue: 'song7',
            disabled: true
          },
          {
            whateverLabel: 'What goes on',
            whateverValue: 'song8'
          },
          {
            whateverLabel: 'Girl',
            whateverValue: 'song9'
          },
          {
            whateverLabel: "I'm looking through you",
            whateverValue: 'song10'
          },
          {
            whateverLabel: 'In My Life',
            whateverValue: 'song11'
          },
          {
            whateverLabel: 'Wait',
            whateverValue: 'song12'
          }
        ]
      },
      {
        type: 'group',
        whateverLabel: 'Let It Be',
        key: 'Let It Be Album',
        whateverChildren: [
          {
            whateverLabel: 'Two Of Us',
            whateverValue: 'Two Of Us'
          },
          {
            whateverLabel: 'Dig A Pony',
            whateverValue: 'Dig A Pony'
          },
          {
            whateverLabel: 'Across The Universe',
            whateverValue: 'Across The Universe'
          },
          {
            whateverLabel: 'I Me Mine',
            whateverValue: 'I Me Mine'
          },
          {
            whateverLabel: 'Dig It',
            whateverValue: 'Dig It'
          },
          {
            whateverLabel: 'Let It Be',
            whateverValue: 'Let It Be'
          },
          {
            whateverLabel: 'Maggie Mae',
            whateverValue: 'Maggie Mae'
          },
          {
            whateverLabel: "I've Got A Feeling",
            whateverValue: "I've Got A Feeling"
          },
          {
            whateverLabel: 'One After 909',
            whateverValue: 'One After 909'
          },
          {
            whateverLabel: 'The Long And Winding Road',
            whateverValue: 'The Long And Winding Road'
          },
          {
            whateverLabel: 'For You Blue',
            whateverValue: 'For You Blue'
          },
          {
            whateverLabel: 'Get Back',
            whateverValue: 'Get Back'
          }
        ]
      }
    ]
    return {
      whateverValue: ref(null),
      options
    }
  }
})
</script>
