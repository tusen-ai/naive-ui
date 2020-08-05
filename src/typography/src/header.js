import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import usecssr from '../../_mixins/usecssr'
import getDefaultSlot from '../../_utils/vue/getDefaultSlot'
import styles from './styles/header'

export default level => ({
  name: 'NH' + level,
  cssrName: 'Typography',
  cssrId: 'TypographyHeader',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    prefix: {
      type: String,
      default: null
    },
    alignText: {
      type: Boolean,
      default: false
    }
  },
  mixins: [
    withapp,
    themeable,
    usecssr(styles)
  ],
  render (h) {
    const props = this.$props
    return h(`h${level}`, {
      class: {
        [`n-h${level}`]: true,
        [`n-${this.syntheticTheme}-theme`]: this.syntheticTheme,
        [`n-h${level}--${props.type}-type`]: props.type,
        [`n-h${level}--prefix-bar`]: props.prefix,
        [`n-h${level}--align-text`]: props.alignText
      }
    }, getDefaultSlot(this))
  }
})
