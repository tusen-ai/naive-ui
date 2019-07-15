<template>
  <i
    :class="`n-nimbus-icon n-nimbus-${type}-icon`"
    :style="styles"
    v-on="$listeners"
  >
    <share-icon
      v-if="type==='share'"
      :color="color"
    />
    <span v-else>icon-type is invalid</span>
  </i>
</template>
<script>
import shareIcon from './icons/share'

export default {
  name: 'NNimbusIcon',
  components: {
    shareIcon
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String],
      default: null
    },
    color: {
      type: String,
      default: null
    }
  },
  computed: {
    styles () {
      let style = {}
      if (this.size) {
        style['font-size'] = `${this.size}px`
      }
      if (this.color) {
        style.color = this.color
      }
      return style
    }
  }
}
</script>
