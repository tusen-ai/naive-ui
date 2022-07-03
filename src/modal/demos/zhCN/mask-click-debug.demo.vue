<markdown>
# Mask click debug
</markdown>

<template>
  <n-space justify="center">
    <NButton type="primary" @click="showModalOne = true">
      Show Modal One
    </NButton>
  </n-space>
  <n-modal
    :show="showModalOne"
    preset="dialog"
    title="Modal One"
    type="success"
    @mask-click="handleCloseOne"
  >
    <n-space vertical justify="center">
      <NButton type="info" @click="showModalTwo = true">
        Show Modal Two
      </NButton>
      <n-image
        width="100"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        preview-src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
      />
      try to show the second modal
    </n-space>
  </n-modal>
  <n-modal
    :show="showModalTwo"
    preset="dialog"
    title="Modal Two"
    type="info"
    @mask-click="handleCloseTwo"
  >
    try to click the mask
  </n-modal>
</template>

<script lang="ts">
import { ref } from 'vue'
import { NSpace, NButton, NModal, NImage } from 'naive-ui'

export default {
  name: 'App',
  components: {
    NSpace,
    NButton,
    NModal,
    NImage
  },
  setup () {
    const showModalOne = ref(false)
    const showModalTwo = ref(false)

    function handleCloseOne () {
      showModalOne.value = false
    }
    function handleCloseTwo () {
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

<style></style>
