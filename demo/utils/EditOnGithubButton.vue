<template>
  <n-button
    class="edit-button"
    ghost
    round
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
      return window.open(this.gheDocUrl, '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  .edit-button {
    vertical-align: middle;
  }
</style>
