<template>
  <div
    class="n-empty"
    :class="{
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
    :style="synthesizedStyle"
  >
    <div class="n-empty__icon">
      <empty-icon />
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
import EmptyIcon from './EmptyIcon'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NEmpty',
  components: {
    EmptyIcon
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
