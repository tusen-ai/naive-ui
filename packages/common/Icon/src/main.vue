<template>
  <i
    :class="classes"
    :style="styles"
  />
</template>
<script>
const prefixCls = 'ion'
export default {
  name: 'NvIcon',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: [Number, String],
    color: String,
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
        style['line-height'] = '1'
      }
      if (this.color) {
        style.color = this.color
      }
      return style
    }
  }
}
</script>
