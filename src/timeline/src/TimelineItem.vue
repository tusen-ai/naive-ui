<template>
  <div
    class="n-timeline-item"
    :class="`n-timeline-item--${type}-type`"
    :style="cssVars"
  >
    <div class="n-timeline-item-timeline">
      <div class="n-timeline-item-timeline__line" />
      <div class="n-timeline-item-timeline__circle" />
    </div>
    <div class="n-timeline-item-content">
      <div v-if="title" class="n-timeline-item-content__title">
        <slot name="header">
          {{ title }}
        </slot>
      </div>
      <div class="n-timeline-item-content__content">
        <slot>
          {{ content }}
        </slot>
      </div>
      <div class="n-timeline-item-content__meta">
        <slot name="footer">
          {{ time }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, inject } from 'vue'
import { useTheme } from '../../_mixins'
import { createKey } from '../../_utils'
import { timelineLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'TimelineItem',
  props: {
    time: {
      type: [String, Number],
      default: undefined
    },
    title: {
      type: String,
      default: undefined
    },
    content: {
      type: String,
      default: undefined
    },
    type: {
      validator (type) {
        return ['default', 'success', 'error', 'warning', 'info'].includes(type)
      },
      default: 'default'
    }
  },
  setup (props) {
    const NTimeline = inject('NTimeline')
    const themeRef = useTheme(
      'Timeline',
      'Timeline',
      style,
      timelineLight,
      props
    )
    return {
      cssVars: computed(() => {
        const { size } = NTimeline
        const { type } = props
        const {
          self: {
            titleTextColor,
            contentTextColor,
            metaTextColor,
            lineColor,
            titleFontWeight,
            contentFontSize,
            [createKey('titleMargin', size)]: titleMargin,
            [createKey('titleFontSize', size)]: titleFontSize,
            [createKey('circleBorder', type)]: circleBorder
          },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--circle-border': circleBorder,
          '--content-font-size': contentFontSize,
          '--content-text-color': contentTextColor,
          '--line-color': lineColor,
          '--meta-text-color': metaTextColor,
          '--title-font-size': titleFontSize,
          '--title-font-weight': titleFontWeight,
          '--title-margin': titleMargin,
          '--title-text-color': titleTextColor
        }
      })
    }
  }
})
</script>
