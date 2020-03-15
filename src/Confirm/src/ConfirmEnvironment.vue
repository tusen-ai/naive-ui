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
      onPositiveClick: () => true,
      onNegativeClick: () => true,
      onClose: () => true,
      instances: null
    }
  },
  methods: {
    handleAfterHide () {
      this.instances.delete(this)
      this.$destroy()
    },
    handlePositiveClick () {
      Promise.resolve(
        this.onPositiveClick()
      )
        .then(result => {
          if (result === false) return
          this.hide()
        })
        .catch(err => console.error(err))
    },
    handleNegativeClick () {
      Promise.resolve(
        this.onNegativeClick()
      )
        .then(result => {
          if (result === false) return
          this.hide()
        })
        .catch(err => console.error(err))
    },
    handleCloseClick () {
      Promise.resolve(
        this.onClose()
      )
        .then(result => {
          if (result === false) return
          this.hide()
        })
        .catch(err => console.error(err))
    },
    hide () {
      this.active = false
    }
  }
}
</script>
