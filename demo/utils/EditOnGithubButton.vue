<script setup lang="ts">
import type { ButtonProps } from 'naive-ui'
import EditIcon from '@vicons/fluent/Compose16Regular.js'
import { blobUrl } from './github-url'

defineOptions({ name: 'EditOnGithubButton' })

const props = withDefaults(
  defineProps<{
    relativeUrl: string
    text?: boolean
    quaternary?: boolean
    size?: ButtonProps['size']
  }>(),
  {
    size: 'tiny'
  }
)

const url = blobUrl + props.relativeUrl
</script>

<template>
  <n-button
    class="edit-button"
    :theme-overrides="
      quaternary
        ? {
          paddingTiny: '4px',
          heightTiny: '14px',
        }
        : undefined
    "
    :quaternary="quaternary"
    :text="!quaternary"
    :size="size"
    tag="a"
    :href="url"
    target="_blank"
  >
    <template #icon>
      <n-icon>
        <EditIcon />
      </n-icon>
    </template>
  </n-button>
</template>
