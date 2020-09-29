<template>
  <n-modal
    v-model:show="show"
    appear
    :to="to"
    :mask-closable="maskClosable"
    @after-leave="handleAfterHide"
  >
    <n-dialog
      :type="type"
      :content="content"
      :positive-text="positiveText"
      :negative-text="negativeText"
      :title="title"
      :loading="loading"
      :closable="closable"
      :show-icon="showIcon"
      :bordered="bordered"
      @close="handleCloseClick"
      @negative-click="handleNegativeClick"
      @positive-click="handlePositiveClick"
    />
  </n-modal>
</template>

<script>
import NModal from '../../modal'
import NDialog from './Dialog.vue'

export default {
  name: 'DialogEnvironment',
  components: {
    NModal,
    NDialog
  },
  props: {
    ...NDialog.props,
    maskClosable: {
      type: Boolean,
      default: true
    },
    onPositiveClick: {
      type: Function,
      default: () => true
    },
    onNegativeClick: {
      type: Function,
      default: () => true
    },
    onClose: {
      type: Function,
      default: () => true
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    // private
    onInternalAfterLeave: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    handleAfterHide () {
      this.onInternalAfterLeave(this._.vnode.key)
    },
    handlePositiveClick () {
      Promise.resolve(
        this.onPositiveClick()
      )
        .then(result => {
          if (result === false) return
          this.hide()
        })
    },
    handleNegativeClick () {
      Promise.resolve(
        this.onNegativeClick()
      )
        .then(result => {
          if (result === false) return
          this.hide()
        })
    },
    handleCloseClick () {
      Promise.resolve(
        this.onClose()
      )
        .then(result => {
          if (result === false) return
          this.hide()
        })
    },
    hide () {
      this.show = false
    }
  }
}
</script>
