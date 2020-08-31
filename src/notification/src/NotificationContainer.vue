<template>
  <div
    class="n-notification-container"
    :class="{
      'n-notification-container--scrollable': scrollable
    }"
  >
    <n-scrollbar v-if="scrollable" ref="scrollbar" :theme="theme" />
  </div>
</template>

<script>
import NScrollbar from '../../scrollbar'

export default {
  components: {
    NScrollbar
  },
  props: {
    scrollable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      theme: null
    }
  }
}
</script>
