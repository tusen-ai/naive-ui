<markdown>
# 头像组

人多不一定是好事。

---

请注意，该演示使用了 `NGAvatarGroup` 组件，该组件自 naive-ui 的 `NEXT_VERSION` 起才可用。

`NGAvatarGroup` 与 `NAvatarGroup` 几乎完全相同，不同之处在于它新增了一个通用的 `options` 属性（generic `options` prop），这可以使在 `.vue` 文件中使用时让 slots 和 props 的类型更精确。

该组件仅在 Vue >= `3.3` 且在 `.vue` 文件中才能使用。

如果你的开发环境不支持 [Vue 泛型组件](https://blog.vuejs.org/posts/vue-3-3#generic-components)，请改用 `NAvatarGroup`。

`NGAvatarGroup` 应从 `'naive-ui/generic'` 中导入。
</markdown>

<script lang="ts" setup>
import type { AvatarGroupOption } from 'naive-ui'
import { NGAvatarGroup } from 'naive-ui/generic'

type Option = AvatarGroupOption & { name: string }

const options: Option[] = [
  {
    name: '张三',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    name: '李四',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    name: '王五',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    name: '赵六',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    name: '七仔',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  }
]

function createDropdownOptions(options: Option[]) {
  return options.map(option => ({
    key: option.name,
    label: option.name
  }))
}
</script>

<template>
  <NGAvatarGroup :options="options" :size="40" :max="3">
    <template #avatar="{ option: { name, src } }">
      <n-tooltip>
        <template #trigger>
          <n-avatar :src="src" />
        </template>
        {{ name }}
      </n-tooltip>
    </template>
    <template #rest="{ options: restOptions, rest }">
      <n-dropdown :options="createDropdownOptions(restOptions)" placement="top">
        <n-avatar>+{{ rest }}</n-avatar>
      </n-dropdown>
    </template>
  </NGAvatarGroup>
</template>
