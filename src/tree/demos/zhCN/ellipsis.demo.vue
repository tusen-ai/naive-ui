<markdown>
# 省略

有时候节点的文本会很长，可以使用 `ellipsis` 来省略文本。
</markdown>

<script lang="ts">
import type { TreeOption } from 'naive-ui'
import { repeat } from 'seemly'
import { defineComponent, ref } from 'vue'

function createData(level = 4, baseKey = ''): TreeOption[] | undefined {
  if (!level)
    return undefined
  return repeat(6 - level, undefined).map((_, index) => {
    const key = `${baseKey}${level}${index}`
    const label = createLabel(level)
    return {
      label,
      key,
      children: createData(level - 1, key)
    }
  })
}

function createLabel(level: number): string {
  if (level === 4)
    return '站在能分割世界的桥 还是看不清 在那些时刻 遮蔽我们 黑暗的心 究竟是什么'
  if (level === 3)
    return '住在我心里孤独的 孤独的海怪 痛苦之王 开始厌倦 深海的光 停滞的海浪 你的心里 有没有一点点想念我'
  if (level === 2)
    return '站在能看到灯火的桥 还是看不清 在那些夜晚 照亮我们 黑暗的心 究竟是什么'
  if (level === 1)
    return '于是他默默追逐着 横渡海峡 年轻的人 看着他们 为了彼岸 骄傲的 骄傲的 灭亡'
  return ''
}

export default defineComponent({
  setup() {
    return {
      data: createData(),
      defaultExpandedKeys: ref(['40', '41'])
    }
  }
})
</script>

<template>
  <n-tree
    ellipsis
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :selectable="false"
  />
</template>
