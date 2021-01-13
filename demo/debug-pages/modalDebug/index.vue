<template>
  <div>
    <n-button @click="isActive = true">
      active
    </n-button>
    <modal-wrapper v-model="isActive" />
  </div>
</template>

<script>
import modalWrapper from './modalWrapper.vue'
export default {
  components: {
    modalWrapper
  },
  data () {
    return { isActive: false }
  }
}
</script>
