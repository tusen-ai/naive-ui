<markdown>
# Cascade

Dropdown options can be cascaded.
</markdown>

<template>
  <n-dropdown
    :options="options"
    placement="bottom-start"
    trigger="click"
    @select="handleSelect"
  >
    <n-button>The Great Gatsby characters</n-button>
  </n-dropdown>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { CashOutline as CashIcon } from '@vicons/ionicons5'

const options = [
  {
    label: 'Jay Gatsby',
    key: 'jay gatsby'
  },
  {
    label: 'Daisy Buchanan',
    icon () {
      return h(NIcon, null, {
        default: () => h(CashIcon)
      })
    },
    key: 'daisy buchanan'
  },
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: 'Nick Carraway',
    key: 'nick carraway'
  },
  {
    label: 'Others',
    key: 'others1',
    children: [
      {
        label: 'Jordan Baker',
        key: 'jordan baker'
      },
      {
        label: 'Tom Buchanan',
        key: 'tom buchanan'
      },
      {
        label: 'Others',
        key: 'others2',
        disabled: true,
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

export default defineComponent({
  data () {
    const message = useMessage()
    return {
      options,
      handleSelect (key: string | number) {
        message.info(String(key))
      }
    }
  }
})
</script>
