<markdown>
# Set check strategy

Set the way to display selected nodes when parents and children are selected. `all` will display both the parent and the children when all the children are selected. `parent` will only show the parent option if all of the children are selected. `child` will only ever show leaf nodes (nodes with no children).
</markdown>

<template>
  <n-space vertical>
    <n-space>
      <n-radio-group v-model:value="checkStrategy">
        <n-radio-button value="all">
          All
        </n-radio-button>
        <n-radio-button value="parent">
          Parent
        </n-radio-button>
        <n-radio-button value="child">
          Child
        </n-radio-button>
      </n-radio-group>
    </n-space>
    <n-tree-select
      multiple
      cascade
      checkable
      :check-strategy="checkStrategy"
      :options="options"
      :default-value="['Dig It', 'go']"
      @update:value="handleUpdateValue"
    />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { TreeSelectOption } from 'naive-ui'

export default defineComponent({
  setup () {
    return {
      checkStrategy: ref<'all' | 'child' | 'parent'>('all'),
      options: [
        {
          label: 'Rubber Soul',
          key: 'Rubber Soul',
          children: [
            {
              label:
                "Everybody's Got Something to Hide Except Me and My Monkey",
              key: "Everybody's Got Something to Hide Except Me and My Monkey"
            },
            {
              label: 'Drive My Car',
              key: 'Drive My Car',
              disabled: true
            },
            {
              label: 'Norwegian Wood',
              key: 'Norwegian Wood'
            },
            {
              label: "You Won't See",
              key: "You Won't See",
              disabled: true
            },
            {
              label: 'Nowhere Man',
              key: 'Nowhere Man'
            },
            {
              label: 'Think For Yourself',
              key: 'Think For Yourself'
            },
            {
              label: 'The Word',
              key: 'The Word'
            },
            {
              label: 'Michelle',
              key: 'Michelle',
              disabled: true
            },
            {
              label: 'What goes on',
              key: 'What goes on'
            },
            {
              label: 'Girl',
              key: 'Girl'
            },
            {
              label: "I'm looking through you",
              key: "I'm looking through you"
            },
            {
              label: 'In My Life',
              key: 'In My Life'
            },
            {
              label: 'Wait',
              key: 'Wait'
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
              key: 'Across The Universe',
              children: [
                {
                  label: 'Dig It',
                  key: 'Dig It'
                },
                {
                  label: 'go',
                  key: 'go'
                }
              ]
            }
          ]
        }
      ],
      handleUpdateValue (
        value: string | number | Array<string | number> | null,
        option: TreeSelectOption | null | Array<TreeSelectOption | null>
      ) {
        console.log(value, option)
      }
    }
  }
})
</script>
