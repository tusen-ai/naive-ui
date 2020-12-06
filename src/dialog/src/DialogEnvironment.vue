<template>
  <n-modal
    v-model:show="show"
    appear
    :clicked="clicked"
    :click-position="clickPosition"
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
import { NModal } from '../../modal'
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
      default: undefined
    },
    onNegativeClick: {
      type: Function,
      default: undefined
    },
    onClose: {
      type: Function,
      default: undefined
    },
    to: {
      type: [String, Object],
      default: undefined
    },
    // private
    onInternalAfterLeave: {
      type: Function,
      required: true
    },
    clicked: {
      type: Boolean,
      default: undefined
    },
    clickPosition: {
      type: Object,
      default: undefined
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
    handlePositiveClick (e) {
      const {
        onPositiveClick = () => true
      } = this
      Promise.resolve(
        onPositiveClick(e)
      )
        .then(result => {
          if (result === false) return
          this.hide()
        })
    },
    handleNegativeClick (e) {
      const {
        onNegativeClick = () => true
      } = this
      Promise.resolve(
        onNegativeClick(e)
      )
        .then(result => {
          if (result === false) return
          this.hide()
        })
    },
    handleCloseClick () {
      const {
        onClose = () => true
      } = this
      Promise.resolve(
        onClose()
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
