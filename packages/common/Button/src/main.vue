<template>
  <button
    class="n-button"
    :class="{
      'n-button--round': round,
      'n-button--circle': circle,
      [`n-button--${type}-type`]: true,
      [`n-button--${size}-size`]: true,
      'n-button--disabled': disabled,
      'n-button--loading': loading,
      'n-button--block': block,
      'n-button--rippling': rippling,
      'n-button--enter-pressed': enterPressed,
      'n-button--ghost': ghost,
      'n-button--right-icon': iconOnRight,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :tabindex="synthesizedFocusable ? 0 : -1"
    @click="handleClick"
    @blur="handleBlur"
    @keyup.enter="handleKeyUpEnter"
    @keydown.enter="handleKeyDownEnter"
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
            'simulate-transparent-stroke': simulateTransparent
          }"
          :size="null"
          :stroke-width="4"
        />
        <n-icon
          v-else-if="icon"
          :class="{
            'simulate-transparent-text': simulateTransparent
          }"
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
      v-if="!circle && $slots.default"
      class="n-button__content"
      :class="{
        'simulate-transparent-text': simulateTransparent
      }"
      :style="style"
    >
      <slot />
    </div>
    <span
      v-else
      class="n-button__content-aligner"
      style="visibility: hidden;"
    >&nbsp;</span>
    <transition
      name="n-fade-in-width-expand"
      :appear="loading"
    >
      <div
        v-if="(loading || hasIcon) && iconOnRight"
        class="n-button__icon"
        :class="{
          'n-button__icon--slot': $slots.icon
        }"
      >
        <n-spin
          v-if="loading"
          :class="{
            'simulate-transparent-stroke': simulateTransparent
          }"
          :stroke-width="4"
        />
        <n-icon
          v-else-if="icon"
          :type="icon"
          :class="{
            'simulate-transparent-text': simulateTransparent
          }"
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
  </button>
</template>

<script>
import NIcon from '../../Icon'
import NSpin from '../../Spin'
import texttransparentable from '../../../mixins/texttransparentable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NButton',
  components: {
    NIcon,
    NSpin
  },
  mixins: [
    withapp,
    themeable,
    texttransparentable
  ],
  props: {
    block: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: 'medium'
    },
    ghost: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    focusable: {
      type: Boolean,
      default: true
    },
    type: {
      validator (value) {
        return ['default', 'primary', 'link', 'info', 'success', 'warning', 'error'].includes(value)
      },
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
      style: {},
      enterPressed: false,
      rippling: false,
      rippleTimer: null
    }
  },
  computed: {
    avoidHollowOut () {
      return this.ghost || !['primary', 'link', 'info', 'success', 'warning', 'error'].includes(this.type)
    },
    simulateTransparent () {
      if (this.ghost) return false
      if (['primary', 'link', 'info', 'success', 'warning', 'error'].includes(this.type)) return true
      else return false
    },
    synthesizedFocusable () {
      return this.focusable && !this.disabled
    },
    hasIcon () {
      return this.icon || this.$slots.icon
    },
    iconOnRight () {
      return this.iconPosition === 'right'
    }
  },
  watch: {
    type (value) {
      if (['primary', 'link', 'info', 'success', 'warning', 'error'].includes(value)) {
        if (!this.cssNode) {

        }
      }
    }
  },
  beforeDestroy () {
    window.clearTimeout(this.rippleTimer)
  },
  methods: {
    handleClick (e) {
      if (!this.disabled) {
        this.$emit('click', e)
        window.clearTimeout(this.rippleTimer)
        this.rippleTimer = null
        this.rippling = false
        this.$nextTick().then(() => {
          this.$el.getBoundingClientRect()
          this.rippling = true
          this.rippleTimer = window.setTimeout(() => {
            this.rippling = false
            this.rippleTimer = null
          }, 600)
        })
        if (this.synthesizedFocusable) {
          this.$el.focus()
        }
      }
    },
    handleKeyUpEnter (e) {
      this.enterPressed = false
      this.$nextTick().then(() => {
        if (!this.disabled) {
          this.$el.click()
        }
      })
    },
    handleKeyDownEnter (e) {
      e.preventDefault()
      this.enterPressed = true
    },
    handleBlur (e) {
      this.enterPressed = false
    }
  }
}
</script>
