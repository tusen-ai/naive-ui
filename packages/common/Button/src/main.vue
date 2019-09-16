<template>
  <button
    class="n-button"
    :class="{
      'n-button--round': round,
      [`n-button--${type}-type`]: true,
      [`n-button--${size}-size`]: true,
      'n-button--disabled': disabled,
      'n-button--loading': loading,
      'n-button--block': block,
      'n-button--rippling': rippling,
      'n-button--enter-pressed': enterPressed
    }"
    :tabindex="focusable && !disabled ? 0 : -1"
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
  </button>
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
    size: {
      type: String,
      default: 'medium'
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
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
      rippling: false
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
  methods: {
    handleClick (e) {
      if (!this.disabled) {
        this.$emit('click', e)
        this.rippling = false
        this.$nextTick().then(() => {
          this.$el.getBoundingClientRect()
          this.rippling = true
        })
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
