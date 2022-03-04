<markdown>
# Sider placement

Sometimes you might want to put the collapsed sidebar on the right.
</markdown>

<template>
  <n-space vertical size="large">
    <n-layout has-sider sider-placement="right">
      <n-layout-content content-style="padding: 24px;">
        Pingshan Road
      </n-layout-content>
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="120"
        :native-scrollbar="true"
        :width="240"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered
      >
        <p>
          Handian Bridge Handian Bridge Handian Bridge Handian Bridge Handian
          Bridge
        </p>
      </n-layout-sider>
    </n-layout>
    <n-layout has-sider sider-placement="right">
      <n-layout-content content-style="padding: 24px;">
        Pingshan Road
      </n-layout-content>
      <n-layout-sider
        collapse-mode="transform"
        :native-scrollbar="false"
        :collapsed-width="120"
        :width="240"
        show-trigger="bar"
        content-style="padding: 24px;"
        bordered
      >
        <n-h2>Handian Bridge</n-h2>
      </n-layout-sider>
    </n-layout>
    <n-layout has-sider sider-placement="right">
      <n-layout style="max-height: 320px" />
      <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        style="max-height: 320px"
      >
        <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>
<script lang="ts">
import { h, defineComponent, Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
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
    key: 'Dance Dance Dance',
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
    return {
      menuOptions
    }
  }
})
</script>
