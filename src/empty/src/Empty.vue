<template>
  <div
    class="n-empty"
    :class="{
      [`n-empty--${size}-size`]: true
    }"
    :style="cssVars"
  >
    <div class="n-empty__icon">
      <slot name="icon">
        <n-icon>
          <empty-icon />
        </n-icon>
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
import { locale, useTheme } from '../../_mixins'
import { createKey } from '../../_utils'
import { EmptyIcon } from '../../_base/icons'
import { NIcon } from '../../icon'
import { emptyLight } from '../styles'
import style from './styles/index.cssr.js'

export default defineComponent({
  name: 'Empty',
  components: {
    EmptyIcon,
    NIcon
  },
  mixins: [locale('Empty')],
  props: {
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
