<markdown>
# Add Tooltip for Option

You can use `render-option` to add tooltip for an option.
</markdown>

<script lang="ts" setup>
import type { DropdownGroupOption, DropdownOption } from 'naive-ui'
import type { VNode } from 'vue'
import { NTooltip, useMessage } from 'naive-ui'
import { h } from 'vue'

const message = useMessage()

function renderOption({
  node,
  option
}: {
  node: VNode
  option: DropdownOption | DropdownGroupOption
}) {
  return h(
    NTooltip,
    { keepAliveOnHover: false, style: { width: 'max-content' } },
    {
      trigger: () => [node],
      default: () => option.key
    }
  )
}

const options = [
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
]

function handleSelect(key: string | number) {
  message.info(String(key))
}
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
