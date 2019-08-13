<template>
  <n-popover
    ref="popover"
    v-model="showPopconfirm"
    class="n-popconfirm"
    trigger="click"
  >
    <template v-slot:activator>
      <slot name="activator" />
    </template>
    <div
      class="n-popconfirm-content"
      :class="{
        'n-popconfirm-content--no-icon': noIcon
      }"
    >
      <div class="n-popconfirm-content__body">
        <slot
          v-if="!noIcon"
          name="icon"
        >
          <n-icon
            type="md-alert"
            color="rgba(255, 138, 0, 1)"
          />
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
  </n-popover>
</template>

<script>
import NPopover from '../../Popover'
import NButton from '../../Button'

export default {
  name: 'NPopconfirm',
  components: {
    NPopover,
    NButton
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
    noIcon: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showPopconfirm: false
    }
  },
  methods: {
    close () {
      this.$refs.popover.active = false
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
