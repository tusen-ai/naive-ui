<markdown>
# Accordion

Like an accordion. You can use `accordion` prop to switch this mode for the first-level menu.
</markdown>

<template>
  <n-menu
    :options="menuOptions"
    :default-expanded-keys="defaultExpandedKeys"
    accordion
  />
</template>

<script lang="ts">
import { defineComponent, h, Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  FishOutline as FishIcon,
  PawOutline as PawIcon,
  BagOutline as BagOutlineIcon
} from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Fish',
    key: 'fish',
    icon: renderIcon(FishIcon),
    children: [
      {
        label: 'Braise',
        key: 'braise',
        children: [
          {
            label: 'Spicy',
            key: 'spicy'
          }
        ]
      },
      {
        label: 'Steamed',
        key: 'steamed',
        children: [
          {
            label: 'No Green Onion',
            key: 'no-green-onion'
          }
        ]
      }
    ]
  },
  {
    label: 'Bear Paw',
    key: 'bear-paw',
    icon: renderIcon(PawIcon),
    children: [
      {
        label: 'Protect Wild Animals',
        key: 'protect-wild-animals'
      }
    ]
  },
  {
    label: 'Both',
    key: 'both',
    icon: renderIcon(BagOutlineIcon),
    children: [
      {
        label: "You can't have your cake and eat it",
        key: 'can-not'
      }
    ]
  }
]

export default defineComponent({
  setup () {
    return {
      menuOptions,
      defaultExpandedKeys: ['fish', 'braise']
    }
  }
})
</script>
