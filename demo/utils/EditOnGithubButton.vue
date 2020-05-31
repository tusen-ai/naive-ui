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
import editIcon from '../../src/_icons/git-pull-request-outline'

export default {
  name: 'EditOnGithubButton',
  components: {
    editIcon
  },
  props: {
    url: {
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
      gheUrl: 'https://***REMOVED***/tree/develop/'
    }
  },
  computed: {
    gheDocUrl () {
      return this.gheUrl + this.url
    }
  },
  methods: {
    handleEditOnGithubClick () {
      window.open(this.gheDocUrl, '_blank')
    }
  }
}
</script>
