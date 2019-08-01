<template>
  <n-modal
    v-model="isActive"
    @toggle="toggle"
  >
    <!-- <transition name="n-modal-content--transition"> -->
    <div class="n-confirm">
      <!-- <slot name="title"> -->
      <div class="n-confirm__title">
        <span class="n-confirm__title__text">
          <n-icon
            class="n-confirm__content__icon"
            :type="iconType.type"
            size="28"
            :color="iconType.color"
          />
          {{ title }}
        </span>

        <n-icon
          type="md-close"
          size="22"
          style="cursor:pointer;"
          @click="handleCancel"
        />
      </div>
      <!-- </slot> -->
      <!-- <slot> -->
      <div class="n-confirm__content">
        <div
          class="n-confirm__content__text"
          v-html="content"
        />
      </div>
      <!-- </slot> -->
      <!-- <slot name="footer"> -->
      <div class="n-comfirm__footer">
        <n-button
          v-if="type === 'confirm'"
          style="margin-bottom:0;"
          round
          size="small"
          @click="handleCancel"
        >
          {{ canCancelText }}
        </n-button>
        <n-button
          style="margin-bottom:0;"
          round
          :disabled="loading === true"
          size="small"
          type="primary"
          auto-text-color
          @click="handleOk"
        >
          {{ loading === true ? "Loading" : okText }}
        </n-button>
      </div>
      <!-- </slot> -->
    </div>
    <!-- </transition> -->
  </n-modal>
</template>

<script>
export default {
  name: 'NConfirm',
  data () {
    return {
      isActive: false,
      content: 'content',
      okText: 'OK',
      canCancelText: 'Cancel',
      type: 'error',
      title: 'title',
      loading: null,
      onCancel: () => {},
      onOk: () => {}
    }
  },
  computed: {
    iconType () {
      const colors = {
        'error': { type: 'ios-close-circle', color: '#FF92A4' },
        'confirm': { type: 'ios-information-circle', color: '#FF92A4' },
        'success': { type: 'ios-checkmark-circle', color: '#63E2B7' }
      }
      return colors[this.type]
    }
  },
  mounted () {
    // this.timer = setInterval(() => {
    //   console.log(1)
    // }, 1000)
  },
  beforeDestroy () {
    // clearInterval(this.timer)
  },
  methods: {
    toggle (isActive) {
      !isActive && setTimeout(() => {
        this.$destroy()
      }, 300)
    },
    handleCancel () {
      this.onCancel()
      this.isActive = false
      setTimeout(() => {
        this.$destroy()
      }, 300)
    },
    handleOk () {
      this.onOk()
      if (this.loading !== true) { this.isActive = false }
    }
    // updateData (data) {
    //   Object.keys(data).forEach((key) => {
    //     this[key] = data[key]
    //   })
    // },
  }
}
</script>

<style scoped>

</style>
