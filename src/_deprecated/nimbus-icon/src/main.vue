<template>
  <i
    :class="`n-nimbus-icon n-nimbus-icon-${type}`"
    :style="styles"
  >
    <share-icon
      v-if="type==='share'"
      :style="iconStyle"
      :color="color"
    />
    <ban-icon
      v-else-if="type==='ban'"
      :style="iconStyle"
      :color="color"
    />
    <pull-request-icon
      v-else-if="type==='pull-request'"
      :style="iconStyle"
      :color="color"
    />
    <operate-icon
      v-else-if="type==='operate'"
      :style="iconStyle"
      :color="color"
    />
    <edit-icon
      v-else-if="type==='edit'"
      :style="iconStyle"
      :color="color"
    />
    <close-icon
      v-else-if="type==='close'"
      :style="iconStyle"
      :color="color"
    />
  </i>
</template>
<script>
import { computed } from 'vue'
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
  setup (props) {
    return {
      iconStyle: {
        pointerEvents: 'none'
      },
      styles: computed(() => {
        const style = {
          height: '1em',
          width: '1em',
          lineHeight: '1em',
          textAlign: 'center',
          display: 'inline-block',
          position: 'relative'
        }
        const { size, color } = props
        if (size) {
          if (typeof size === 'number') {
            style.width = size + 'px'
            style.height = size + 'px'
          } else if (size.endsWith('%') || size.endsWith('px')) {
            style.width = size
            style.height = size
          } else {
            style.width = size + 'px'
            style.height = size + 'px'
          }
        }
        if (color) {
          style.color = color
        }
        return style
      })
    }
  }
}
</script>
