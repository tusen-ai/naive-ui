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
    handleConfirm (e) {
      const confirmInstance = this.$NModal.confirm({
        title: 'Confirm',
        content: 'Are u sure to ...?',
        okText: 'Yes', // 自定义ok按钮文字 error和success也可以使用
        cancelText: 'No', // 自定义取消按钮文字
        activateEvent: e,
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
