<template>
  <n-button
    class="edit-button"
    ghost
    round
    :size="size"
    :text="text"
    @click="handleEditOnGithubClick"
  >
    <template v-slot:icon>
      <create-outline />
    </template>
  </n-button>
</template>

<script>
import createOutline from '../../src/_icons/create-outline'

export default {
  name: 'EditOnGithubButton',
  components: {
    createOutline
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
