<template>
  <div
    ref="doc"
    class="readme"
  >
    <private-readme v-if="token === 'naive'" />
    <readme v-else />
  </div>
</template>

<script>
import readme from './start.vue.md'
import privateReadme from './privateStart.vue.md'
import { replaceEmojiWithImages } from '../../utils'

export default {
  components: {
    readme,
    privateReadme
  },
  data () {
    return {
      token: null
    }
  },
  mounted () {
    replaceEmojiWithImages(this.$refs.doc)
    this.token = localStorage.token
  }
}
</script>

<style scoped>
.readme {
  padding: 24px 0 24px 0;
  max-width: 720px;
  margin: auto;
}
</style>
