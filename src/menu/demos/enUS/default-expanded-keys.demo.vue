<markdown>
# Expand submenu

If you don't set `default-expanded-keys`, menu will expand all the ascendant of selected option by default.
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
import { NIcon, useMessage } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Hear the Wind Sing',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: 'Pinball 1973',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: 'Rat',
        key: 'rat'
      }
    ]
  },
  {
    label: 'A Wild Sheep Chase',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: 'Dance Dance Dance',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: 'People',
        key: 'people',
        children: [
          {
            label: 'Narrator',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: 'Sheep Man',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: 'Beverage',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: 'Whisky',
            key: 'whisky'
          }
        ]
      },
      {
        label: 'Food',
        key: 'food',
        children: [
          {
            label: 'Sandwich',
            key: 'sandwich'
          }
        ]
      },
      {
        label: 'The past increases. The future recedes.',
        key: 'the-past-increases-the-future-recedes'
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
