<template>
  <div
    ref="doc"
    class="readme"
  >
    <readme />
  </div>
</template>

<script>
import readme from './start.vue.md'
import { replaceEmojiWithImages } from '../../utils'

export default {
  components: {
    readme
  },
  mounted () {
    replaceEmojiWithImages(this.$refs.doc)
  },
  methods: {
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
