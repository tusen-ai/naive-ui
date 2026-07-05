<script
  lang="ts"
  setup
  generic="T extends AvatarGroupOption = AvatarGroupOption"
>
import type {
  AvatarGroupOption,
  GAvatarGroupProps,
  GAvatarGroupSlots
} from 'naive-ui'
import { NAvatarGroup } from 'naive-ui'

defineProps<GAvatarGroupProps<T>>()
defineSlots<GAvatarGroupSlots<T>>()
</script>

<template>
  <NAvatarGroup v-bind="$props">
    <template #avatar="props">
      <slot name="avatar" v-bind="props as any" />
    </template>
    <template #rest="props">
      <slot name="rest" v-bind="props as any" />
    </template>
  </NAvatarGroup>
</template>
