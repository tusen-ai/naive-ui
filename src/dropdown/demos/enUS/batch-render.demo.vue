<markdown>
# Batch rendering

Note: the `render-label` will take effect for group type labels, which can be set through `option.type`.
</markdown>

<template>
  <n-dropdown
    :options="options"
    placement="bottom-start"
    trigger="click"
    :render-label="renderDropdownLabel"
    :render-icon="renderDropdownIcon"
  >
    <n-button>Batch Render</n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import type { VNodeChild } from 'vue'
import { NIcon } from 'naive-ui'
import type { DropdownOption } from 'naive-ui'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

const options = [
  {
    type: 'group',
    label: 'People and Some Food to Eat',
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
        label: 'food',
        key: 'food',
        children: [
          {
            label: 'chicken',
            key: 'chicken'
          },
          {
            label: 'beef',
            key: 'beef'
          }
        ]
      }
    ]
  }
]

export default defineComponent({
  setup () {
    return {
      options,
      renderDropdownLabel (option: DropdownOption) {
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
      },
      renderDropdownIcon () {
        return h(NIcon, null, {
          default: () => h(CashIcon)
        })
      }
    }
  }
})
</script>
