<template>
  <i
    :class="classes"
    :style="styles"
    v-on="$listeners"
  />
</template>
<script>
const prefixCls = 'ion'
export default {
  name: 'NIcon',
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
    },
    custom: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes () {
      return [
        {
          [`${prefixCls}-${this.type}`]: this.type !== '',
          [`${this.custom}`]: this.custom !== ''
        }
      ]
    },
    styles () {
      let style = {}
      if (this.size) {
        style['font-size'] = `${this.size}px`
        style['line-height'] = `${this.size}px`
      }
      if (this.color) {
        style.color = this.color
      }
      return style
    }
  }
}
</script>
