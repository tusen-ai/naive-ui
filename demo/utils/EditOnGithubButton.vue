<template>
  <n-button
    class="edit-button"
    :theme-overrides="
      quaternary
        ? {
          paddingTiny: '4px',
          heightTiny: '14px'
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
        <edit-icon />
      </n-icon>
    </template>
  </n-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import type { ButtonProps } from 'naive-ui'
import EditIcon from '@vicons/fluent/Compose16Regular.js'
import { blobUrl } from './github-url'

export default defineComponent({
  name: 'EditOnGithubButton',
  components: {
    EditIcon
  },
  props: {
    relativeUrl: {
      type: String,
      required: true
    },
    text: Boolean,
    quaternary: Boolean,
    size: {
      type: String as PropType<ButtonProps['size']>,
      default: 'tiny'
    }
  },
  setup (props) {
    return {
      url: blobUrl + props.relativeUrl
    }
  }
})
</script>
