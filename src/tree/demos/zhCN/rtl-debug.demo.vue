<markdown>
# Rtl Debug
</markdown>

<template>
  <n-space vertical>
    <n-space><n-switch v-model:value="rtlEnabled" />Rtl</n-space>
    <n-config-provider :rtl="rtlEnabled ? rtlStyles : undefined">
      <n-tree
        block-line
        :data="data"
        :default-expanded-keys="defaultExpandedKeys"
        checkable
        expand-on-click
        selectable
      />
    </n-config-provider>
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { repeat } from 'seemly'
import { unstableTreeRtl, TreeOption } from 'naive-ui'

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
      rtlEnabled: ref(false),
      rtlStyles: [unstableTreeRtl],
      data: createData(),
      defaultExpandedKeys: ref(['40', '41'])
    }
  }
})
</script>
