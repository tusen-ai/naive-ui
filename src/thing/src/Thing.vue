<template>
  <div class="n-thing" :style="cssVars">
    <div v-if="$slots.avatar && contentIndented" class="n-thing-avatar">
      <slot name="avatar" />
    </div>
    <div class="n-thing-main">
      <div
        v-if="
          !contentIndented &&
            ($slots.header ||
              title ||
              $slots['header-extra'] ||
              titleExtra ||
              $slots.avatar)
        "
        class="n-thing-avatar-header-wrapper"
      >
        <div v-if="$slots.avatar && !contentIndented" class="n-thing-avatar">
          <slot name="avatar" />
        </div>
        <div
          v-if="$slots.header || title || $slots['header-extra'] || titleExtra"
          class="n-thing-header-wrapper"
        >
          <div class="n-thing-header">
            <div v-if="$slots.header || title" class="n-thing-header__title">
              <slot name="header">
                {{ title }}
              </slot>
            </div>
            <div
              v-if="$slots['header-extra'] || titleExtra"
              class="n-thing-header__extra"
            >
              <slot name="header-extra">
                {{ titleExtra }}
              </slot>
            </div>
          </div>
          <div
            v-if="$slots.description || description"
            class="n-thing-main__description"
          >
            <slot name="description">
              {{ description }}
            </slot>
          </div>
        </div>
      </div>
      <template v-else>
        <div
          v-if="$slots.header || title || $slots['header-extra'] || titleExtra"
          class="n-thing-header"
        >
          <div v-if="$slots.header || title" class="n-thing-header__title">
            <slot name="header">
              {{ title }}
            </slot>
          </div>
          <div
            v-if="$slots['header-extra'] || titleExtra"
            class="n-thing-header__extra"
          >
            <slot name="header-extra">
              {{ titleExtra }}
            </slot>
          </div>
        </div>
        <div
          v-if="$slots.description || description"
          class="n-thing-main__description"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </div>
      </template>
      <div v-if="$slots.default || content" class="n-thing-main__content">
        <slot>
          {{ content }}
        </slot>
      </div>
      <div v-if="$slots.footer" class="n-thing-main__footer">
        <slot name="footer" />
      </div>
      <div v-if="$slots.action" class="n-thing-main__action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { thingLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Thing',
  props: {
    ...useTheme.props,
    title: {
      type: String,
      default: undefined
    },
    titleExtra: {
      type: String,
      default: undefined
    },
    description: {
      type: String,
      default: undefined
    },
    content: {
      type: String,
      default: undefined
    },
    contentIndented: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const themeRef = useTheme('Thing', 'Thing', style, thingLight, props)
    return {
      cssVars: computed(() => {
        const {
          self: { titleTextColor, textColor, titleFontWeight, fontSize },
          common: { cubicBezierEaseInOut }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--font-size': fontSize,
          '--text-color': textColor,
          '--title-font-weight': titleFontWeight,
          '--title-text-color': titleTextColor
        }
      })
    }
  }
})
</script>
