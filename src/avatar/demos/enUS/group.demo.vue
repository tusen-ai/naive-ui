<markdown>
# Avatar Group

Crowded people.

---

Please note that the demo uses `NGAvatarGroup` which is available since naive-ui `NEXT_VERSION`.

The `NGAvatarGroup` is the same as `NAvatarGroup` except with a generic `options` prop which can make slots & props types more accurate in Vue files.

The component is only available in Vue >= `3.3` and in `.vue` files.

If your environment doesn't support [Vue Generic Components](https://blog.vuejs.org/posts/vue-3-3#generic-components), please use `NAvatarGroup` instead.

The `NGAvatarGroup` should be imported from 'naive-ui/generic'.
</markdown>

<script lang="ts" setup>
import type { AvatarGroupOption } from 'naive-ui'
import { NGAvatarGroup } from 'naive-ui/generic'

type Option = AvatarGroupOption & { name: string }

const options: Option[] = [
  {
    name: 'Leonardo DiCaprio',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    name: 'Jennifer Lawrence',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    name: 'Audrey Hepburn',
    src: 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
  },
  {
    name: 'Anne Hathaway',
    src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg'
  },
  {
    name: 'Taylor Swift',
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
