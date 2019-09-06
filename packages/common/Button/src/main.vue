<template>
  <div
    class="n-button"
    :class="{
      'n-button--round': round,
      [`n-button--${type}-type`]: true,
      [`n-button--${size}-size`]: true,
      'n-button--disabled': disabled,
      'n-button--loading': loading
    }"
    @click="handleClick"
  >
    <transition
      name="n-fade-in-width-expand"
    >
      <div
        v-if="(hasIcon || loading) && !iconOnRight"
        class="n-button__icon"
        :class="{'n-button__icon--slot': $slots.icon }"
      >
        <n-spin
          v-if="loading"
          :class="{
            'simulate-transparent-stroke': type === 'primary'
          }"
          :size="null"
          :stroke-width="4"
        />
        <n-icon
          v-else-if="icon"
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
    </transition>
    <div
      class="n-button__content"
      :class="{
        'simulate-transparent-text': type === 'primary'
      }"
      :style="style"
    >
      <slot />
    </div>
    <transition
      name="n-fade-in-width-expand"
      :appear="loading"
    >
      <div
        v-if="(loading || hasIcon) && iconOnRight"
        class="n-button__icon n-button__icon--right"
        :class="{
          'n-button__icon--slot': $slots.icon
        }"
      >
        <n-spin
          v-if="loading"
          :class="{
            'simulate-transparent-stroke': type === 'primary'
          }"
          :size="null"
          :stroke-width="4"
        />
        <n-icon
          v-else-if="icon"
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
    </transition>
  </div>
</template>

<script>
import NIcon from '../../Icon'
import NSpin from '../../Spin'
import texttransparentable from '../../../mixins/texttransparentable'

export default {
  name: 'NButton',
  components: {
    NIcon,
    NSpin
  },
  mixins: [
    texttransparentable
  ],
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
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
    iconPosition: {
      default: null,
      validator (iconPosition) {
        return ['left', 'right'].includes(iconPosition)
      }
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
    },
    iconOnRight () {
      return this.iconPosition === 'right'
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
