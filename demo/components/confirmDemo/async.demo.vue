<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Async
    </div>
    <div
      class="n-doc-section__view"
      style="display: block;"
    >
      <!--EXAMPLE_START-->
      <n-button @click="handleConfirm">
        Async Confirm
      </n-button>

      <!--EXAMPLE_END-->
    </div>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleConfirm () {
      const confirmInstance = this.$NModal.confirm({
        title: 'Confirm',
        content: 'Are u sure to ...?',
        onOk: () => {
          console.log('click on ok', confirmInstance)
          this.$NMessage.info('will be ok in 3 seconds')
          confirmInstance.setLoading(true)
          setTimeout(() => {
            this.$NMessage.success('sure')
            confirmInstance.remove()
          }, 3000)
        },
        onCancel: () => {
          this.$NMessage.error('cancel')
        }
      })
    }
  }
}
</script>
