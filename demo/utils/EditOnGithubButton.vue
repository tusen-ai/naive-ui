<template>
  <n-button
    class="edit-button"
    text
    :size="size"
    @click="handleEditOnGithubClick"
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
