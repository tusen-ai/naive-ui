<template>
  <div
    class="n-empty"
    :class="{
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-empty--${size}-size`]: true
    }"
    :style="mergedStyle"
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
import { configurable, themeable, locale, withCssr } from '../../_mixins'
import { EmptyIcon } from '../../_base/icons'
import { NIcon } from '../../icon'
import styles from './styles/index'

export default {
  name: 'Empty',
  components: {
    EmptyIcon,
    NIcon
  },
  mixins: [configurable, themeable, locale('Empty'), withCssr(styles)],
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
  computed: {
    localizedDescription () {
      return this.description || this.locale.description
    }
  }
}
</script>
