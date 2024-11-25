<markdown>
# Switcher icon

Use `render-switcher-icon` prop to customize switcher icon.
</markdown>

<script lang="ts">
import type { TreeOption } from 'naive-ui'
import { ChevronForward, PlanetOutline, SunnyOutline } from '@vicons/ionicons5'
import { NIcon } from 'naive-ui'
import { repeat } from 'seemly'
import { defineComponent, h, ref } from 'vue'

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
    return 'Out of Tao, One is born'
  if (level === 3)
    return 'Out of One, Two'
  if (level === 2)
    return 'Out of Two, Three'
  if (level === 1)
    return 'Out of Three, the created universe'
  return ''
}

export default defineComponent({
  setup() {
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
