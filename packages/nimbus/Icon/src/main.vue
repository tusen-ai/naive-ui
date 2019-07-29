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
  </i>
</template>
<script>
import shareIcon from './icons/share'
import banIcon from './icons/ban'
import pullRequestIcon from './icons/pullRequest'
import operateIcon from './icons/operate'
import editIcon from './icons/edit'

const validTypes = ['share', 'ban', 'pull-request', 'operate', 'edit']

export default {
  name: 'NNimbusIcon',
  components: {
    shareIcon,
    banIcon,
    pullRequestIcon,
    operateIcon,
    editIcon
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
      default: 16
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
