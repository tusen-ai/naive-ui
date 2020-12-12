import { h } from 'vue'
import { configurable, themeable, withCssr } from '../../_mixins'
import { getSlot } from '../../_utils'
import styles from './styles/header'

export default (level) => ({
  name: 'H' + level,
  cssrName: 'Typography',
  cssrId: 'TypographyHeader',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    prefix: {
      type: String,
      default: undefined
    },
    alignText: {
      type: Boolean,
      default: false
    }
  },
  mixins: [configurable, themeable, withCssr(styles)],
  render () {
    const props = this.$props
    return h(
      `h${level}`,
      {
        class: {
          [`n-h${level}`]: true,
          [`n-${this.mergedTheme}-theme`]: this.mergedTheme,
          [`n-h${level}--${props.type}-type`]: props.type,
          [`n-h${level}--prefix-bar`]: props.prefix,
          [`n-h${level}--align-text`]: props.alignText
        }
      },
      getSlot(this)
    )
  }
})
