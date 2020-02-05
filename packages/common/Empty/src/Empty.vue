<template>
  <div
    class="n-empty"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :style="synthesizedStyle"
  >
    <div class="n-empty__icon">
      <ios-remove-circle-outline />
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
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import locale from '../../../mixins/locale'
import iosRemoveCircleOutline from '../../../icons/ios-remove-circle-outline'

export default {
  name: 'NEmpty',
  components: {
    iosRemoveCircleOutline
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
    }
  },
  computed: {
    localizedDescription () {
      return this.description || this.localeNamespace.description
    }
  }
}
</script>
