<markdown>
# 折叠侧边栏的位置

有时候你可能想将折叠侧边栏放在右侧。
</markdown>

<template>
  <n-space vertical size="large">
    <n-layout has-sider sider-placement="right">
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="120"
        :width="240"
        :native-scrollbar="true"
        show-trigger="arrow-circle"
        content-style="padding: 24px;"
        bordered
      >
        <p>海淀桥 海淀桥 海淀桥 海淀桥 海淀桥</p>
      </n-layout-sider>
    </n-layout>
    <n-layout has-sider sider-placement="right">
      <n-layout-content content-style="padding: 24px;">
        平山道
      </n-layout-content>
      <n-layout-sider
        collapse-mode="transform"
        :collapsed-width="120"
        :width="240"
        :native-scrollbar="false"
        show-trigger="bar"
        content-style="padding: 24px;"
        bordered
      >
        <n-h2>海淀桥</n-h2>
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
    label: '且听风吟',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon)
  },
  {
    label: '1973年的弹珠玩具',
    key: 'pinball-1973',
    icon: renderIcon(BookIcon),
    disabled: true,
    children: [
      {
        label: '鼠',
        key: 'rat'
      }
    ]
  },
  {
    label: '寻羊冒险记',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(BookIcon)
  },
  {
    label: '舞，舞，舞',
    key: 'dance-dance-dance',
    icon: renderIcon(BookIcon),
    children: [
      {
        type: 'group',
        label: '人物',
        key: 'people',
        children: [
          {
            label: '叙事者',
            key: 'narrator',
            icon: renderIcon(PersonIcon)
          },
          {
            label: '羊男',
            key: 'sheep-man',
            icon: renderIcon(PersonIcon)
          }
        ]
      },
      {
        label: '饮品',
        key: 'beverage',
        icon: renderIcon(WineIcon),
        children: [
          {
            label: '威士忌',
            key: 'whisky'
          }
        ]
      },
      {
        label: '食物',
        key: 'food',
        children: [
          {
            label: '三明治',
            key: 'sandwich'
          }
        ]
      },
      {
        label: '过去增多，未来减少',
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
