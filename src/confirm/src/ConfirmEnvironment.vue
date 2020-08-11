<template>
  <n-modal
    v-model="active"
    :theme="syntheticTheme"
    :activate-event="event"
    :mask-closable="maskClosable"
    @after-hide="handleAfterHide"
  >
    <n-confirm
      :theme="syntheticTheme"
      :type="type"
      :content="content"
      :positive-text="positiveText"
      :negative-text="negativeText"
      :title="title"
      :loading="loading"
      :closable="closable"
      :show-icon="showIcon"
      :bordered="bordered"
      theme-context-activated
      @close="handleCloseClick"
      @negative-click="handleNegativeClick"
      @positive-click="handlePositiveClick"
    />
  </n-modal>
</template>

<script>
import NModal from '../../modal'
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
      inheritedTheme: null,
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
      instances: null,
      closable: true,
      showIcon: true,
      bordered: false
    }
  },
  computed: {
    syntheticTheme () {
      return this.theme || this.inheritedTheme
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
