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
      'n-button--text': text,
      [`n-button--${iconPosition}-icon`]: iconPosition && !noTextContent,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :tabindex="synthesizedFocusable ? 0 : -1"
    @click="handleClick"
    @blur="handleBlur"
    @keyup.enter="handleKeyUpEnter"
    @keydown.enter="handleKeyDownEnter"
  >
    <n-fade-in-height-expand-transition width>
      <div
        v-if="(hasIcon || loading) && !iconOnRight"
        class="n-button__icon"
        :class="{ 'n-button__icon--slot': $slots.icon }"
      >
        <n-icon-switch-transition>
          <n-spin
            v-if="loading"
            key="loading"
            class="n-icon-slot"
            :style="{
              transition: hollowOutColorTransitionDisabled ? 'none' : null
            }"
            :stroke="simulateHollowOut ? ascendantBackgroundColor : null"
            :stroke-width="4"
          />
          <n-icon
            v-else
            key="icon"
            :style="{
              transition: hollowOutColorTransitionDisabled ? 'none' : null,
              fill: simulateHollowOut ? ascendantBackgroundColor : null
            }"
            class="n-icon-slot"
          >
            <slot
              name="icon"
            />
          </n-icon>
        </n-icon-switch-transition>
      </div>
    </n-fade-in-height-expand-transition>
    <div
      v-if="!circle && $slots.default"
      class="n-button__content"
      :style="{
        transition: hollowOutColorTransitionDisabled ? 'none' : null,
        color: simulateHollowOut ? ascendantBackgroundColor : null
      }"
    >
      <slot />
    </div>
    <n-fade-in-height-expand-transition width>
      <div
        v-if="(loading || hasIcon) && iconOnRight"
        class="n-button__icon"
        :class="{
          'n-button__icon--slot': $slots.icon
        }"
      >
        <n-icon-switch-transition>
          <n-spin
            v-if="loading"
            key="loading"
            :style="{
              transition: hollowOutColorTransitionDisabled ? 'none' : null
            }"
            :stroke="simulateHollowOut ? ascendantBackgroundColor : null"
            :stroke-width="4"
          />
          <n-icon
            v-else
            key="icon"
            class="n-icon-slot"
            :style="{
              transition: hollowOutColorTransitionDisabled ? 'none' : null,
              fill: simulateHollowOut ? ascendantBackgroundColor : null
            }"
          >
            <slot
              name="icon"
            />
          </n-icon>
        </n-icon-switch-transition>
      </div>
    </n-fade-in-height-expand-transition>
  </button>
</template>

<script>
import NSpin from '../../Spin'
import NFadeInHeightExpandTransition from '../../../transition/FadeInHeightExpandTransition'
import hollowoutable from '../../../mixins/hollowoutable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import NIcon from '../../Icon'
import NIconSwitchTransition from '../../../transition/IconSwitchTransition'

export default {
  name: 'NButton',
  components: {
    NSpin,
    NIcon,
    NIconSwitchTransition,
    NFadeInHeightExpandTransition
  },
  mixins: [withapp, themeable, hollowoutable],
  props: {
    text: {
      type: Boolean,
      default: false
    },
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
        return ['tiny', 'small', 'medium', 'large'].includes(value)
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
        return [
          'default',
          'primary',
          'link',
          'info',
          'success',
          'warning',
          'error'
        ].includes(value)
      },
      default: 'default'
    },
    icon: {
      type: String,
      default: null
    },
    iconPosition: {
      default: 'left',
      validator (iconPosition) {
        return ['left', 'right'].includes(iconPosition)
      }
    }
  },
  data () {
    return {
      enterPressed: false,
      rippling: false,
      rippleTimer: null
    }
  },
  computed: {
    noTextContent () {
      return this.circle || !this.$slots.default
    },
    avoidHollowOut () {
      return (
        this.ghost ||
        !['primary', 'link', 'info', 'success', 'warning', 'error'].includes(
          this.type
        )
      )
    },
    simulateHollowOut () {
      if (this.ghost) return false
      if (this.text) return false
      if (
        ['primary', 'link', 'info', 'success', 'warning', 'error'].includes(
          this.type
        )
      ) { return true } else return false
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
      if (
        ['primary', 'link', 'info', 'success', 'warning', 'error'].includes(
          value
        )
      ) {
        if (!this.cssNode) {
          // TODO: something
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
        if (!this.text) {
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
        }
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
