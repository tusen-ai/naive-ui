<template>
  <n-button
    class="edit-button"
    text
    :size="size"
    tag="a"
    :href="url"
    target="_blank"
    :depth="depth"
  >
    <template #icon>
      <n-icon>
        <edit-icon />
      </n-icon>
    </template>
  </n-button>
</template>

<script>
import EditIcon from '@vicons/fluent/Compose16Regular.js'
import { blobUrl } from './github-url'

export default {
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
    size: String,
    depth: String
  },
  setup (props) {
    return {
      url: blobUrl + props.relativeUrl
    }
  }
}
</script>
