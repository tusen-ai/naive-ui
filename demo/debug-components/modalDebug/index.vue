<template>
  <div>
    <n-button @click="isActive = true">
      active
    </n-button>
    <modal-wrapper v-model="isActive" />
  </div>
</template>

<script>
import modalWrapper from './modalWrapper'
export default {
  components: {
    modalWrapper
  },
  data () {
    return { isActive: false }
  }
}
</script>
