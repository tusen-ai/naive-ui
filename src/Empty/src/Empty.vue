<template>
  <div
    class="n-empty"
    :class="{
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      [`n-empty--${size}-size`]: true
    }"
    :style="syntheticStyle"
  >
    <div class="n-empty__icon">
      <slot name="icon">
        <n-icon>
          <remove-circle-outline />
        </n-icon>
      </slot>
    </div>
    <div v-if="showDescription" class="n-empty__description">
      <slot>
        {{ localizedDescription }}
      </slot>
    </div>
    <div v-if="$scopedSlots.extra" class="n-empty__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script>
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import locale from '../../_mixins/locale'
import removeCircleOutline from '../../_icons/remove-circle-outline'
import NIcon from '../../Icon'

export default {
  name: 'NEmpty',
  components: {
    removeCircleOutline,
    NIcon
  },
  mixins: [ withapp, themeable, locale('Empty') ],
  props: {
    description: {
      type: String,
      default: null
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
      return this.description || this.localeNamespace.description
    }
  }
}
</script>
