<template>
  <div
    class="n-popconfirm-content"
    :class="{
      'n-popconfirm-content--no-icon': !showIcon
    }"
  >
    <div class="n-popconfirm-content__body">
      <slot
        v-if="showIcon"
        name="icon"
      >
        <n-icon
          color="rgba(255, 138, 0, 1)"
        >
          <md-alert />
        </n-icon>
      </slot>
      <slot />
    </div>
    <template>
      <div class="n-popconfirm-content__action">
        <slot name="action">
          <n-button
            size="tiny"
            round
            @click="handleNegativeClick"
          >
            {{ negativeText }}
          </n-button>
          <n-button
            round
            size="tiny"
            type="primary"
            @click="handlePositiveClick"
          >
            {{ positiveText }}
          </n-button>
        </slot>
      </div>
    </template>
  </div>
</template>

<script>
import NButton from '../../Button'
import NIcon from '../../Icon'
import mdAlert from '../../../icons/md-alert'

export default {
  components: {
    NButton,
    NIcon,
    mdAlert
  },
  props: {
    positiveText: {
      type: String,
      default: 'Confirm'
    },
    negativeText: {
      type: String,
      default: 'Cancel'
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    controller: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showPopconfirm: false
    }
  },
  methods: {
    close () {
      console.log(this.controller)
      this.controller.hide()
    },
    handlePositiveClick () {
      this.$emit('positive-click')
      this.close()
    },
    handleNegativeClick () {
      this.$emit('negative-click')
      this.close()
    }
  }
}
</script>
