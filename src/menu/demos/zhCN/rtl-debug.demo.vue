<markdown>
# Rtl Debug
</markdown>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'
import { BookOutline, PersonOutline, WineOutline } from '@vicons/ionicons5'
import { NIcon, unstableMenuRtl } from 'naive-ui'
import { h, ref } from 'vue'

const rtlEnabled = ref(false)
const collapsed = ref(false)
const rtlStyles = [unstableMenuRtl]

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const options: MenuOption[] = [
  { label: 'هيا ونحن نغني', key: 'a', icon: renderIcon(BookOutline) },
  {
    label: 'النشيد',
    key: 'b',
    icon: renderIcon(PersonOutline),
    children: [
      {
        type: 'group',
        label: 'مجموعة',
        key: 'g',
        children: [
          { label: 'البند الأول', key: 'b1' },
          { label: 'البند الثاني', key: 'b2' }
        ]
      },
      {
        label: 'قائمة فرعية',
        key: 'b3',
        icon: renderIcon(WineOutline),
        children: [{ label: 'عنصر عميق', key: 'b3-1' }]
      }
    ]
  }
]
</script>

<template>
  <n-space vertical>
    <n-space>
      <n-switch v-model:value="rtlEnabled" />Rtl
      <n-switch v-model:value="collapsed" />Collapsed
    </n-space>
    <n-config-provider
      :rtl="rtlEnabled ? rtlStyles : undefined"
      :dir="rtlEnabled ? 'rtl' : undefined"
    >
      <n-menu
        mode="horizontal"
        :options="options"
        :default-expanded-keys="['b']"
      />
      <n-layout has-sider style="height: 360px">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed="collapsed"
          :collapsed-width="64"
          :width="240"
        >
          <n-menu
            :options="options"
            :collapsed="collapsed"
            :collapsed-width="64"
            :default-expanded-keys="['b', 'b3']"
            default-value="b3-1"
          />
        </n-layout-sider>
        <n-layout-content />
      </n-layout>
    </n-config-provider>
  </n-space>
</template>
