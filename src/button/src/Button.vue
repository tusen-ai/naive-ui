<template>
  <button
    class="n-button"
    :class="{
      'n-button--round': round,
      'n-button--circle': circle,
      'n-button--disabled': disabled,
      'n-button--loading': loading,
      'n-button--block': block,
      'n-button--active': enterPressed,
      'n-button--ghost': ghost,
      'n-button--text': text,
      'n-button--no-text': noTextContent,
      [`n-button--${type}-type`]: true,
      [`n-button--${colorDigest || type}-colored`]: true,
      [`n-button--${syntheticSize}-size`]: true,
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
    }"
    :tabindex="syntheticFocusable ? 0 : -1"
    :type="attrType"
    @click="handleClick"
    @blur="handleBlur"
    @mousedown="handleMouseDown"
    @keyup.enter="handleKeyUpEnter"
    @keydown.enter="handleKeyDownEnter"
  >
    <div
      v-if="!circle && $scopedSlots.default && iconOnRight"
      class="n-button__content"
      :style="{
        transition: hollowOutColorTransitionDisabled ? 'none' : null,
        color: hollowText ? ascendantBackgroundColor : null
      }"
    >
      <slot />
    </div>
    <n-fade-in-height-expand-transition width>
      <div
        v-if="(hasIcon || loading)"
        class="n-button__icon"
        :class="{ 'n-button__icon--slot': $scopedSlots.icon }"
      >
        <n-icon-switch-transition>
          <n-base-loading
            v-if="loading"
            key="loading"
            class="n-icon-slot"
            :theme="syntheticTheme"
            :style="{
              transition: hollowOutColorTransitionDisabled ? 'none' : null
            }"
            :stroke="hollowText ? ascendantBackgroundColor : null"
            :stroke-width="24"
          />
          <n-icon
            v-else
            key="icon"
            :style="{
              transition: hollowOutColorTransitionDisabled ? 'none' : null,
              fill: hollowText ? ascendantBackgroundColor : null,
              stroke: hollowText ? ascendantBackgroundColor : null
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
      v-if="!circle && $scopedSlots.default && !iconOnRight"
      class="n-button__content"
      :style="{
        transition: hollowOutColorTransitionDisabled ? 'none' : null,
        color: hollowText ? ascendantBackgroundColor : null
      }"
    >
      <slot />
    </div>
    <n-base-wave v-if="!text" ref="wave" />
    <div class="n-button__border-mask" />
  </button>
</template>

<script>
import hollowoutable from '../../_mixins/hollowoutable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import NFadeInHeightExpandTransition from '../../_transition/FadeInHeightExpandTransition'
import NIconSwitchTransition from '../../_transition/IconSwitchTransition'
import NBaseLoading from '../../_base/loading'
import NBaseWave from '../../_base/wave/index.js'
import NIcon from '../../icon/index.js'
import styles from './styles/index.js'
import { read, hash } from '../../_utils/color/index.js'
import colorStyle from './styles/themed-color.cssr.js'

export default {
  name: 'Button',
  components: {
    NBaseLoading,
    NBaseWave,
    NIcon,
    NIconSwitchTransition,
    NFadeInHeightExpandTransition
  },
  inject: {
    NButtonGroup: {
      default: null
    },
    NFormItem: {
      default: null
    }
  },
  mixins: [
    withapp,
    themeable,
    hollowoutable,
    usecssr(styles)
  ],
  props: {
    color: {
      type: String,
      default: null
    },
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
    keyboard: {
      type: Boolean,
      default: true
    },
    type: {
      // TODO: warning message
      validator (value) {
        return [
          'default',
          'primary',
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
    iconPlacement: {
      default: 'left',
      validator (value) {
        return ['left', 'right'].includes(value)
      }
    },
    iconDepth: {
      default: 'secondary',
      validator (value) {
        return ['secondary', 'tertiary'].includes(value)
      }
    },
    attrType: {
      default: 'button',
      validator (value) {
        return ['button', 'submit', 'reset'].includes(value)
      }
    }
  },
  data () {
    return {
      enterPressed: false
    }
  },
  computed: {
    colorDigest () {
      if (!this.color) return null
      return hash(read(this.color))
    },
    syntheticSize () {
      const NButtonGroup = this.NButtonGroup
      if (NButtonGroup && NButtonGroup.size) {
        return NButtonGroup.size
      }
      const NFormItem = this.NFormItem
      if (
        NFormItem &&
        NFormItem !== '__FORM_ITEM_INNER__' &&
        NFormItem.syntheticSize
      ) {
        return NFormItem.syntheticSize
      }
      return this.size
    },
    noTextContent () {
      return this.circle || !this.$scopedSlots.default
    },
    avoidHollowOut () {
      return (
        this.text ||
        this.ghost ||
        (this.type === 'default' && !this.color)
      )
    },
    hollowText () {
      return !this.avoidHollowOut
    },
    syntheticFocusable () {
      return this.focusable && !this.disabled
    },
    hasIcon () {
      return this.icon || this.$scopedSlots.icon
    },
    iconOnRight () {
      return this.iconPlacement === 'right'
    }
  },
  watch: {
    colorDigest (value, oldValue) {
      if (oldValue) {
        colorStyle.unmount({
          target: 'NButton-color-' + oldValue,
          delay: 3000
        })
      }
      if (value) {
        colorStyle.mount({
          target: 'NButton-color-' + value,
          props: {
            colorDigest: value,
            color: this.color
          }
        })
      }
    }
  },
  created () {
    const color = this.color
    const colorDigest = this.colorDigest
    if (color) {
      colorStyle.mount({
        target: 'NButton-color-' + colorDigest,
        props: {
          colorDigest,
          color
        }
      })
    }
  },
  beforeDestroy () {
    const colorDigest = this.colorDigest
    if (colorDigest) {
      colorStyle.unmount({
        target: 'NButton-color-' + colorDigest,
        delay: 3000
      })
    }
  },
  methods: {
    handleMouseDown (e) {
      e.preventDefault()
      if (this.disabled) {
        return
      }
      if (this.syntheticFocusable) {
        this.$el.focus()
      }
    },
    handleClick (e) {
      if (!this.disabled) {
        this.$emit('click', e)
        if (!this.text) {
          const waveRef = this.$refs.wave
          if (waveRef) {
            waveRef.play()
          }
        }
      }
    },
    handleKeyUpEnter (e) {
      if (!this.keyboard) {
        e.preventDefault()
        return
      }
      this.enterPressed = false
      this.$nextTick(() => {
        if (!this.disabled) {
          this.$el.click()
        }
      })
    },
    handleKeyDownEnter (e) {
      e.preventDefault()
      if (!this.keyboard) return
      this.enterPressed = true
    },
    handleBlur (e) {
      this.enterPressed = false
    }
  }
}
</script>
