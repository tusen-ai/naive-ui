<markdown>
# Render Debug

</markdown>

<template>
  <n-select v-model:value="value" filterable :options="options" />
</template>

<script lang="ts">
import { h, defineComponent, VNode } from 'vue'
import { NTooltip, SelectGroupOption, SelectOption } from 'naive-ui'

export default defineComponent({
  setup () {
    const options: Array<SelectOption | SelectGroupOption> = [
      {
        type: 'group',
        label: 'Rubber Soul',
        key: 'Rubber Soul',
        render: ({ node }: { node: VNode }) => {
          return h(NTooltip, null, {
            trigger: () => node,
            default: () => '用户需要这种功能我也很无奈1'
          })
        },
        children: [
          {
            label: () =>
              "Everybody's Got Something to Hide Except Me and My Monkey",
            value: 'song0',
            disabled: true
          },
          {
            label: 'Drive My Car',
            value: 'song1',
            render: ({ node }: { node: VNode }) => {
              return h(NTooltip, null, {
                trigger: () => node,
                default: () => '用户需要这种功能我也很无奈2'
              })
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
      }
    ]
    return {
      value: null,
      options
    }
  }
})
</script>
