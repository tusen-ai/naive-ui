<template>
  <div
    class="n-button"
    :class="{
      'is-round': round,
      [`is-${type}`]: true,
      [`n-button--${size}-size`]: true,
      'n-button--disabled': disabled
    }"
    @click="handleClick"
  >
    <div
      v-if="hasIcon && !iconOnRight"
      class="n-button__icon"
      :class="{'n-button__icon--slot': $slots.icon }"
    >
      <n-icon
        v-if="icon"
        :type="icon"
      />
      <div
        v-else
        class="n-icon-slot"
      >
        <slot
          name="icon"
        />
      </div>
    </div>
    <div
      class="n-button__content"
      :class="{
        'simulate-transparent-text': type === 'primary'
      }"
      :style="style"
    >
      <slot />
    </div>
    <div
      v-if="hasIcon && iconOnRight"
      class="n-button__icon n-button__icon--right"
      :class="{'n-button__icon--slot': $slots.icon }"
    >
      <n-icon
        v-if="icon"
        :type="icon"
      />
      <div
        v-else
        class="n-icon-slot"
      >
        <slot
          name="icon"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NIcon from '../../Icon/index'
import texttransparentable from '../../../mixins/texttransparentable'

export default {
  name: 'NButton',
  components: {
    NIcon
  },
  mixins: [
    texttransparentable
  ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    },
    round: {
      type: Boolean,
      default: false
    },
    gradient: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: null
    },
    iconOnRight: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      style: {}
    }
  },
  computed: {
    hasIcon () {
      return this.icon || this.$slots.icon
    }
  },
  mounted () {
  },
  methods: {
    handleClick (e) {
      if (!this.disabled) {
        this.$emit('click', e)
      }
    }
  }
}
</script>
