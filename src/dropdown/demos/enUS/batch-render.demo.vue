<markdown>
# Batch Render

Note: `render-label` works for group type label, which can be set in `option.type`.
</markdown>

<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { h } from 'vue'

const options = [
  {
    type: 'group',
    label: 'People & Food',
    key: 'main',
    children: [
      {
        label: 'Jay Gatsby',
        key: 'jay gatsby'
      },
      {
        label: 'Daisy Buchanan',
        key: 'daisy buchanan'
      },
      {
        label: 'Nick Carraway',
        key: 'nick carraway'
      },
      {
        label: 'Food',
        key: 'food',
        children: [
          {
            label: 'Chicken',
            key: 'chicken'
          },
          {
            label: 'Beef',
            key: 'beef'
          }
        ]
      }
    ]
  }
]

function renderDropdownLabel(option: DropdownOption) {
  if (option.type === 'group') {
    return option.label as VNodeChild
  }
  return h(
    'a',
    {
      href: '',
      target: '_blank'
    },
    {
      default: () => option.label as VNodeChild
    }
  )
}

function renderDropdownIcon() {
  return h(NIcon, null, {
    default: () => h(CashIcon)
  })
}
</script>

<template>
  <n-dropdown
    :options="options"
    placement="bottom-start"
    trigger="click"
    :render-label="renderDropdownLabel"
    :render-icon="renderDropdownIcon"
  >
    <n-button>Batch Rendered</n-button>
  </n-dropdown>
</template>
