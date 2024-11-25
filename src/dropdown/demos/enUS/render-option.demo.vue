<markdown>
# Add tooltip for option

You can use `render-option` to add tooltip for option.
</markdown>

<script lang="ts">
import type { DropdownGroupOption, DropdownOption } from 'naive-ui'
import type { VNode } from 'vue'
import { NTooltip, useMessage } from 'naive-ui'
import { defineComponent, h } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()
    return {
      renderOption: ({
        node,
        option
      }: {
        node: VNode
        option: DropdownOption | DropdownGroupOption
      }) => {
        return h(
          NTooltip,
          { keepAliveOnHover: false, style: { width: 'max-content' } },
          {
            trigger: () => [node],
            default: () => option.key
          }
        )
      },
      options: [
        {
          label: 'Marina Bay Sands',
          key: 'marina bay sands',
          disabled: true
        },
        {
          label: 'Brown\'s Hotel, London',
          key: 'brown\'s hotel, london'
        },
        {
          label: 'Atlantis Bahamas, Nassau',
          key: 'atlantis nahamas, nassau'
        },
        {
          label: 'The Beverly Hills Hotel, Los Angeles',
          key: 'the beverly hills hotel, los angeles'
        }
      ],
      handleSelect(key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>

<template>
  <n-dropdown
    trigger="hover"
    :options="options"
    :render-option="renderOption"
    @select="handleSelect"
  >
    <n-button>Go For a Trip</n-button>
  </n-dropdown>
</template>
