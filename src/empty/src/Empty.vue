<template>
  <div class="n-empty" :style="cssVars">
    <div class="n-empty__icon">
      <slot name="icon">
        <n-base-icon>
          <empty-icon />
        </n-base-icon>
      </slot>
    </div>
    <div v-if="showDescription" class="n-empty__description">
      <slot>
        {{ localizedDescription }}
      </slot>
    </div>
    <div v-if="$slots.extra" class="n-empty__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { EmptyIcon } from '../../_base/icons'
import { useLocale, useTheme } from '../../_mixins'
import { createKey } from '../../_utils'
import { NBaseIcon } from '../../_base'
import { emptyLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Empty',
  components: {
    EmptyIcon,
    NBaseIcon
  },
  props: {
    ...useTheme.props,
    description: {
      type: String,
      default: undefined
    },
    showDescription: {
      type: Boolean,
      default: true
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large', 'huge'].includes(value)
      },
      default: 'medium'
    }
  },
  setup (props) {
    const themeRef = useTheme('Empty', 'Empty', style, emptyLight, props)
    return {
      ...useLocale('Empty'),
      cssVars: computed(() => {
        const { size } = props
        const {
          common: { cubicBezierEaseInOut },
          self: {
            [createKey('iconSize', size)]: iconSize,
            [createKey('fontSize', size)]: fontSize,
            textColor,
            iconColor,
            extraTextColor
          }
        } = themeRef.value
        return {
          '--icon-size': iconSize,
          '--font-size': fontSize,
          '--bezier': cubicBezierEaseInOut,
          '--text-color': textColor,
          '--icon-color': iconColor,
          '--extra-text-color': extraTextColor
        }
      })
    }
  },
  computed: {
    localizedDescription () {
      return this.description || this.locale.description
    }
  }
})
</script>
