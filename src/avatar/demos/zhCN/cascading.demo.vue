<markdown>
# 层叠方向

头像也分上下
</markdown>

<script lang="ts" setup>
import type { AvatarGroupOption } from 'naive-ui'
import { NAvatarGroup } from 'naive-ui'

const options: AvatarGroupOption[] = [
  {
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  }
]
</script>

<template>
  <NFlex vertical>
    <NAvatarGroup :options="options" cascading="left-up" />
    <NAvatarGroup :options="options" cascading="right-up" />
  </NFlex>
</template>
