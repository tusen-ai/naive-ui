<template>
  <n-button
    class="edit-button"
    text
    icon-depth="tertiary"
    :size="size"
    @click="handleEditOnGithubClick"
  >
    <template v-slot:icon>
      <edit-icon />
    </template>
  </n-button>
</template>

<script>
import editIcon from '../../src/_deprecated/icons/git-commit-outline.vue'
import githubUrl from './github-url'

export default {
  name: 'EditOnGithubButton',
  components: {
    editIcon
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
