<template>
  <n-modal
    v-model="active"
    :theme="theme"
    :activate-event="event"
    :mask-closable="maskClosable"
    @after-hide="handleAfterHide"
  >
    <n-confirm
      :theme="theme"
      :type="type"
      :content="content"
      :positive-text="positiveText"
      :negative-text="negativeText"
      :title="title"
      :loading="loading"
      @close="handleCloseClick"
      @negative-click="handleNegativeClick"
      @positive-click="handlePositiveClick"
    />
  </n-modal>
</template>

<script>
import NModal from '../../Modal'
import NConfirm from './Confirm'

export default {
  name: 'NConfirm',
  components: {
    NModal,
    NConfirm
  },
  data () {
    return {
      theme: null,
      maskClosable: true,
      active: false,
      content: null,
      icon: null,
      positiveText: null,
      negativeText: null,
      type: 'warning',
      title: null,
      loading: false,
      event: null,
      onPositiveClick: () => {
        this.active = false
      },
      onNegativeClick: () => {
        this.active = false
      },
      onClose: () => {
        this.active = false
      },
      instances: null
    }
  },
  methods: {
    handleAfterHide () {
      this.instances.delete(this)
      this.$destroy()
    },
    handlePositiveClick () {
      this.onPositiveClick(this.hide)
    },
    handleNegativeClick () {
      this.onNegativeClick(this.hide)
    },
    handleCloseClick () {
      this.onClose(this.hide)
    },
    hide () {
      this.active = false
    }
  }
}
</script>
