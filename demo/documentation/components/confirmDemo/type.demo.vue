<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Type
    </div>
    <div
      class="n-doc-section__view"
      style="display: block;"
    >
      <!--EXAMPLE_START-->
      <n-button @click="handleConfirm">
        Confirm
      </n-button>
      <n-button @click="handleSuccess">
        Success
      </n-button>
      <n-button @click="handleError">
        Error
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
        content: '<b>Are u sure to ...?',
        activateEvent: e,
        onOk: () => {
          console.log('click on ok', confirmInstance)
          this.$NMessage.success('sure')
        },
        onCancel: () => {
          this.$NMessage.error('cancel')
        }
      })
    },
    handleSuccess (e) {
      const confirmInstance = this.$NModal.success({
        title: 'Success',
        content: 'Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by the Ionic Framework team.',
        activateEvent: e,
        onOk: () => {
          console.log('click on ok', confirmInstance)

          this.$NMessage.success('show tooltip')
        }
      })
    },
    handleError (e) {
      const confirmInstance = this.$NModal.error({
        title: 'Error',
        content: '<b>这是一个测试？</b>hhahhaahahhahahsdiusah ashdusadu asdsadsadsadsadsa',
        activateEvent: e,
        onOk: () => {
          console.log('click on ok', confirmInstance)
          this.$NMessage.success('I know..')
        }
      })
    }
  }
}
</script>
