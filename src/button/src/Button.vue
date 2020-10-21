<template>
  <button
    class="n-button"
    :class="{
      'n-button--round': round,
      'n-button--circle': circle,
      'n-button--disabled': disabled,
      'n-button--block': block,
      'n-button--pressed': enterPressed,
      'n-button--base': !text && !(ghost || dashed),
      'n-button--ghost': !text && (ghost || dashed),
      'n-button--text': text,
      'n-button--dashed': !text && dashed,
      'n-button--hide-icon-margin': hideIconMargin,
      [`n-button--${type}-type`]: true,
      [`n-button--${colorDigest || type}-colored`]: true,
      [`n-button--${mergedSize}-size`]: true,
      [`n-${mergedTheme}-theme`]: mergedTheme,
    }"
    :tabindex="mergedFocusable ? 0 : -1"
    :type="attrType"
    @click="handleClick"
    @blur="handleBlur"
    @mousedown="handleMouseDown"
    @keyup.enter="handleKeyUpEnter"
    @keydown.enter="handleKeyDownEnter"
  >
    <div
      v-if="!circle && $slots.default && iconOnRight"
      class="n-button__content"
    >
      <slot />
    </div>
    <n-fade-in-expand-transition width>
      <div
        v-if="(hasIcon || loading)"
        class="n-button__icon"
      >
        <n-icon-switch-transition>
          <n-base-loading
            v-if="loading"
            key="loading"
            class="n-icon-slot"
            :theme="mergedTheme"
            :stroke-width="24"
          />
          <n-icon
            v-else
            key="icon"
            class="n-icon-slot"
          >
            <slot
              name="icon"
            />
          </n-icon>
        </n-icon-switch-transition>
      </div>
    </n-fade-in-expand-transition>
    <div
      v-if="!circle && $slots.default && !iconOnRight"
      class="n-button__content"
    >
      <slot />
    </div>
    <n-base-wave v-if="!text" ref="wave" />
    <div v-if="!text" class="n-button__border-mask" />
  </button>
</template>

<script>
import {
  configurable,
  themeable,
  usecssr
} from '../../_mixins'
import NFadeInExpandTransition from '../../_transition/FadeInExpandTransition'
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
    NFadeInExpandTransition
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
    configurable,
    themeable,
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
      default: undefined
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
    dashed: {
      type: Boolean,
      default: false
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
    mergedSize () {
      const { size } = this
      if (size) return size
      const { NButtonGroup } = this
      if (NButtonGroup && NButtonGroup.size) {
        return NButtonGroup.size
      }
      const { NFormItem } = this
      if (
        NFormItem &&
        NFormItem.mergedSize
      ) {
        return NFormItem.mergedSize
      }
      return 'medium'
    },
    hideIconMargin () {
      return this.circle || !this.$slots.default
    },
    mergedFocusable () {
      return this.focusable && !this.disabled
    },
    hasIcon () {
      return this.$slots.icon
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
  beforeUnmount () {
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
      if (this.mergedFocusable) {
        this.$el.focus()
      }
    },
    handleClick (e) {
      if (!this.disabled) {
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
