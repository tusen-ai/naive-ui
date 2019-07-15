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
    <span v-else>icon-type is invalid</span>
  </i>
</template>
<script>
import shareIcon from './icons/share'
import banIcon from './icons/ban'

export default {
  name: 'NNimbusIcon',
  components: {
    shareIcon,
    banIcon
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
// <style>
// .n-nimbus-icon svg:hover g {
//   fill:blue;
// }
// .n-nimbus-icon svg g {
//   transition: fill .3s ease-in-out;
//   fill:red;
// }
// </style>
</script>
