<markdown>
# 展开开关的图标

使用 `render-switcher-icon` 定制展开开关的图标。
</markdown>

<template>
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :render-switcher-icon="renderSwitcherIcon"
    selectable
  />
  <n-tree
    block-line
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :render-switcher-icon="renderSwitcherIconWithExpaned"
    selectable
  />
</template>

<script lang="ts">
import { defineComponent, ref, h } from 'vue'
import { repeat } from 'seemly'
import { NIcon, TreeOption } from 'naive-ui'
import { ChevronForward, SunnyOutline, PlanetOutline } from '@vicons/ionicons5'

function createData (level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level) return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel (level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}

export default defineComponent({
  setup () {
    return {
      data: createData(),
      defaultExpandedKeys: ref(['40', '41']),
      renderSwitcherIcon: () =>
        h(NIcon, null, { default: () => h(ChevronForward) }),
      renderSwitcherIconWithExpaned: ({ expanded }: { expanded: boolean }) =>
        h(NIcon, null, {
          default: () => h(expanded ? SunnyOutline : PlanetOutline)
        })
    }
  }
})
</script>
