<markdown>
  # Node display mode

  You can use `get-children` to implement different ways of displaying nodes.
  </markdown>

<template>
  <n-flex vertical align="start">
    <n-switch v-model:value="active" />
    <n-tree-select
      :options="options"
      default-value="Drive My Car"
      :get-children="
        active
          ? (v) => (v.children?.length ? v.children : undefined)
          : undefined
      "
      @update:value="handleUpdateValue"
    />
  </n-flex>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TreeSelectOption } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      active: ref(false),
      handleUpdateValue (
        value: string | number | Array<string | number> | null,
        option: TreeSelectOption | null | Array<TreeSelectOption | null>
      ) {
        console.log(value, option)
      },
      options: [
        {
          label: 'Rubber Soul',
          key: 'Rubber Soul',
          children: [
            {
              label:
                "Everybody's Got Something to Hide Except Me and My Monkey",
              key: "Everybody's Got Something to Hide Except Me and My Monkey",
              children: []
            },
            {
              label: 'Drive My Car',
              key: 'Drive My Car',
              disabled: true,
              children: []
            },
            {
              label: 'Norwegian Wood',
              key: 'Norwegian Wood',
              children: []
            },
            {
              label: "You Won't See",
              key: "You Won't See",
              disabled: true,
              children: []
            },
            {
              label: 'Nowhere Man',
              key: 'Nowhere Man',
              children: []
            },
            {
              label: 'Think For Yourself',
              key: 'Think For Yourself',
              children: []
            },
            {
              label: 'The Word',
              key: 'The Word',
              children: []
            },
            {
              label: 'Michelle',
              key: 'Michelle',
              disabled: true,
              children: []
            },
            {
              label: 'What goes on',
              key: 'What goes on',
              children: []
            },
            {
              label: 'Girl',
              key: 'Girl',
              children: []
            },
            {
              label: "I'm looking through you",
              key: "I'm looking through you",
              children: []
            },
            {
              label: 'In My Life',
              key: 'In My Life',
              children: []
            },
            {
              label: 'Wait',
              key: 'Wait',
              children: []
            }
          ]
        },
        {
          label: 'Let It Be',
          key: 'Let It Be Album',
          children: [
            {
              label: 'Two Of Us',
              key: 'Two Of Us'
            },
            {
              label: 'Dig A Pony',
              key: 'Dig A Pony'
            },
            {
              label: 'Across The Universe',
              key: 'Across The Universe'
            },
            {
              label: 'I Me Mine',
              key: 'I Me Mine'
            },
            {
              label: 'Dig It',
              key: 'Dig It'
            },
            {
              label: 'Let It Be',
              key: 'Let It Be'
            },
            {
              label: 'Maggie Mae',
              key: 'Maggie Mae'
            },
            {
              label: "I've Got A Feeling",
              key: "I've Got A Feeling"
            },
            {
              label: 'One After 909',
              key: 'One After 909'
            },
            {
              label: 'The Long And Winding Road',
              key: 'The Long And Winding Road'
            },
            {
              label: 'For You Blue',
              key: 'For You Blue'
            },
            {
              label: 'Get Back',
              key: 'Get Back'
            }
          ]
        }
      ]
    }
  }
})
</script>
