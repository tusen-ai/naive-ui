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
    <operate-icon
      v-else-if="type==='operate'"
      :color="color"
    />
    <edit-icon
      v-else-if="type==='edit'"
      :color="color"
    />
    <close-icon
      v-else-if="type==='close'"
      :color="color"
    />
  </i>
</template>
<script>
import shareIcon from './icons/share.vue'
import banIcon from './icons/ban.vue'
import pullRequestIcon from './icons/pullRequest.vue'
import operateIcon from './icons/operate.vue'
import editIcon from './icons/edit.vue'
import closeIcon from './icons/close.vue'

const validTypes = ['share', 'ban', 'pull-request', 'operate', 'edit', 'close']

export default {
  name: 'NNimbusIcon',
  components: {
    shareIcon,
    banIcon,
    pullRequestIcon,
    operateIcon,
    editIcon,
    closeIcon
  },
  props: {
    type: {
      validator (type) {
        return validTypes.includes(type)
      },
      required: true
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
        if (typeof this.size === 'number') {
          style['width'] = this.size + 'px'
          style['height'] = this.size + 'px'
        } else if (this.size.endsWith('%') || this.size.endsWith('px')) {
          style['width'] = this.size
          style['height'] = this.size
        } else {
          style['width'] = this.size + 'px'
          style['height'] = this.size + 'px'
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

<style scoped>
.n-nimbus-icon {
  height: 1em;
  width: 1em;
  line-height: 1em;
  text-align: center;
  display: inline-block;
  position: relative;

}
.n-nimbus-icon svg {
  pointer-events: none;
}
</style>
