<markdown>
# Mask click debug
</markdown>

<script lang="ts">
import { NButton, NImage, NModal, NSpace } from 'naive-ui'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    NSpace,
    NButton,
    NModal,
    NImage
  },
  setup() {
    const showModalOne = ref(false)
    const showModalTwo = ref(false)

    function handleCloseOne() {
      showModalOne.value = false
    }
    function handleCloseTwo() {
      showModalTwo.value = false
    }

    return {
      showModalOne,
      showModalTwo,
      handleCloseOne,
      handleCloseTwo
    }
  }
}
</script>

<template>
  <NSpace justify="center">
    <NButton type="primary" @click="showModalOne = true">
      Show Modal One
    </NButton>
  </NSpace>
  <NModal
    :show="showModalOne"
    preset="dialog"
    title="Modal One"
    type="success"
    @mask-click="handleCloseOne"
  >
    <NSpace vertical justify="center">
      <NButton type="info" @click="showModalTwo = true">
        Show Modal Two
      </NButton>
      <NImage
        width="100"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        preview-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      try to show the second modal
    </NSpace>
  </NModal>
  <NModal
    :show="showModalTwo"
    preset="dialog"
    title="Modal Two"
    type="info"
    @mask-click="handleCloseTwo"
  >
    try to click the mask
  </NModal>
</template>

<style></style>
