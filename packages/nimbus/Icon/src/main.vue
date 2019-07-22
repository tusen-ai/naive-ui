<template>
  <i
    :class="`n-nimbus-icon n-nimbus-icon-${type}`"
    :style="styles"
    v-on="$listeners"
  >
    <share-icon
      v-if="type==='share'"
      :color="color"
    />
    <ban-icon
      v-else-if="type==='ban'"
      :color="color"
    />
    <pull-request-icon
      v-else-if="type==='pull-request'"
      :color="color"
    />
    <span v-else>icon-type is invalid</span>
  </i>
</template>
<script>
import shareIcon from './icons/share'
import banIcon from './icons/ban'
import pullRequestIcon from './icons/pullRequest'

export default {
  name: 'NNimbusIcon',
  components: {
    shareIcon,
    banIcon,
    pullRequestIcon
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
        if (this.size.endsWith('%') || this.size.endsWith('px')) {
          style['width'] = this.size
        } else {
          style['width'] = this.size + 'px'
        }
      }
      if (this.color) {
        style.color = this.color
      }
      return style
    }
  }
}
</script>
