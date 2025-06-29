<markdown>
# 展开开关的图标

使用 `render-switcher-icon` 定制展开开关的图标。
</markdown>

<script lang="ts" setup>
import type { TreeOption } from 'naive-ui'
import { ChevronForward, PlanetOutline, SunnyOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { repeat } from 'seemly'
import { h, ref } from 'vue'

function createData(level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level)
    return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = `${baseKey}${level}${index}`
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel(level: number): string {
  if (level === 4)
    return '道生一'
  if (level === 3)
    return '一生二'
  if (level === 2)
    return '二生三'
  if (level === 1)
    return '三生万物'
  return ''
}

const data = createData()
const defaultExpandedKeys = ref(['40', '41'])
function renderSwitcherIcon() {
  return h(NIcon, null, { default: () => h(ChevronForward) })
}
function renderSwitcherIconWithExpaned({ expanded }: { expanded: boolean }) {
  return h(NIcon, null, {
    default: () => h(expanded ? SunnyOutline : PlanetOutline)
  })
}
</script>

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
