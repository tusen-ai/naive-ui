<markdown>
# Debug
</markdown>

<template>
  <n-menu
    :options="menuOptions"
    :default-expanded-keys="defaultExpandedKeys"
    @update:expanded-keys="handleUpdateExpandedKeys"
  />
</template>

<script lang="ts">
import { defineComponent, h, Component } from 'vue'
import { NButton, NIcon, useMessage, MenuOption } from 'naive-ui'
import { BookOutline as BookIcon } from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Hear the Wind Sing',
    key: 'hear-the-wind-sing',
    extra: () => h(NButton, {}, () => ' debug test'),
    icon: renderIcon(BookIcon)
  },
  {
    label: 'Pinball 1973',
    key: 'pinball-1973',
    extra: () => h(NButton, {}, () => 'debug 1937'),
    children: [
      {
        label: 'Rat',
        extra: '24',
        key: 'rat'
      }
    ]
  }
]

export default defineComponent({
  setup () {
    const message = useMessage()

    return {
      menuOptions,
      defaultExpandedKeys: ['dance-dance-dance', 'food'],
      handleUpdateExpandedKeys (value: string[]) {
        message.info('[onUpdate:expandedKeys]: ' + JSON.stringify(value))
      }
    }
  }
})
</script>
