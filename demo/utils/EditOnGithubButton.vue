<template>
  <n-button
    class="edit-button"
    text
    :size="size"
    @click="handleEditOnGithubClick"
  >
    <template #icon>
      <edit-icon />
    </template>
  </n-button>
</template>

<script>
import { Compose16Regular as EditIcon } from '@vicons/fluent'
import githubUrl from './github-url'

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
    text: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      githubUrl
    }
  },
  computed: {
    gheDocUrl () {
      return this.githubUrl + this.relativeUrl
    }
  },
  methods: {
    handleEditOnGithubClick () {
      window.open(this.gheDocUrl, '_blank')
    }
  }
}
</script>
