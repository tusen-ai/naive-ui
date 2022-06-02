<markdown>
# Add tooltip for option

You can use `render-option` to add tooltip for option.
</markdown>

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

<script lang="ts">
import { defineComponent, h, VNode } from 'vue'
import {
  useMessage,
  NTooltip,
  DropdownOption,
  DropdownGroupOption
} from 'naive-ui'

export default defineComponent({
  setup () {
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
          label: "Brown's Hotel, London",
          key: "brown's hotel, london"
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
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
