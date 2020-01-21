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
        {{ description }}
      </slot>
    </div>
    <div v-if="$slots.default" class="n-empty__extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script>
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'
import iosRemoveCircleOutline from '../../../icons/ios-remove-circle-outline'

export default {
  name: 'NEmpty',
  components: {
    iosRemoveCircleOutline
  },
  mixins: [ withapp, themeable ],
  props: {
    description: {
      type: String,
      default: 'No Data'
    },
    showDescription: {
      type: Boolean,
      default: true
    }
  }
}
</script>
