<template>
  <div class="n-notification-container">
    <n-scrollbar ref="scrollbar" :theme="theme" />
  </div>
</template>

<script>
import NScrollbar from '../../Scrollbar'

export default {
  components: {
    NScrollbar
  },
  data () {
    return {
      theme: null
    }
  }
}
</script>
