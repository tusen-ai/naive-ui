<template>
  <div
    class="n-card"
    :class="{
      [`n-card--content${
        segmented && segmented.content === 'soft' ? '-soft' : ''
      }-segmented`]: segmented === true || (segmented && segmented.content),
      [`n-card--footer${
        segmented && segmented.footer === 'soft' ? '-soft' : ''
      }-segmented`]: segmented === true || (segmented && segmented.footer),
      [`n-card--action-segmented`]:
        segmented === true || (segmented && segmented.action),
      [`n-card--${size}-size`]: true,
      'n-card--bordered': bordered
    }"
    :style="cssVars"
  >
    <div v-if="$slots.cover" class="n-card-cover">
      <slot name="cover" />
    </div>
    <div v-if="$slots.header || title || closable" class="n-card-header">
      <div class="n-card-header__main" :style="headerStyle">
        <slot name="header">
          {{ title }}
        </slot>
      </div>
      <div v-if="$slots['header-extra']" class="n-card-header__extra">
        <slot name="header-extra" />
      </div>
      <n-icon
        v-if="closable"
        class="n-card-header__close-mark"
        size="16"
        color-transition
        @click="handleCloseClick"
      >
        <close-icon />
      </n-icon>
    </div>
    <div class="n-card__content" :style="contentStyle">
      <slot />
    </div>
    <div v-if="$slots.footer" class="n-card__footer">
      <slot name="footer" />
    </div>
    <div v-if="$slots.action" class="n-card__action">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { createKey } from '../../_utils'
import { NIcon } from '../../icon'
import { CloseIcon } from '../../_base/icons'
import { cardLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Card',
  components: {
    CloseIcon,
    NIcon
  },
  props: {
    ...useTheme.props,
    title: {
      type: String,
      default: undefined
    },
    contentStyle: {
      type: [Object, String],
      default: undefined
    },
    headerStyle: {
      type: [Object, String],
      default: undefined
    },
    segmented: {
      type: [Boolean, Object],
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    bordered: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function,
      default: undefined
    }
  },
  setup (props) {
    const handleCloseClick = () => {
      const { onClose } = props
      if (onClose) onClose()
    }
    const themeRef = useTheme('Card', 'Card', style, cardLight, props)
    return {
      handleCloseClick,
      cssVars: computed(() => {
        const { size } = props
        const {
          self: {
            color,
            textColor,
            titleTextColor,
            titleFontWeight,
            borderColor,
            actionColor,
            borderRadius,
            closeColor,
            closeColorHover,
            closeColorPressed,
            lineHeight,
            [createKey('paddingTop', size)]: paddingTop,
            [createKey('paddingBottom', size)]: paddingBottom,
            [createKey('paddingLeft', size)]: paddingLeft,
            [createKey('paddingRight', size)]: paddingRight,
            [createKey('fontSize', size)]: fontSize,
            [createKey('titleFontSize', size)]: titleFontSize
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--border-radius': borderRadius,
          '--color': color,
          '--text-color': textColor,
          '--line-height': lineHeight,
          '--action-color': actionColor,
          '--title-text-color': titleTextColor,
          '--title-font-weight': titleFontWeight,
          '--close-color': closeColor,
          '--close-color-hover': closeColorHover,
          '--close-color-pressed': closeColorPressed,
          '--border-color': borderColor,
          // size
          '--padding-top': paddingTop,
          '--padding-right': paddingRight,
          '--padding-bottom': paddingBottom,
          '--padding-left': paddingLeft,
          '--font-size': fontSize,
          '--title-font-size': titleFontSize
        }
      })
    }
  }
})
</script>
