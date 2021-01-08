import { h, defineComponent, computed } from 'vue'
import { useTheme } from '../../_mixins'
import { getSlot, createKey } from '../../_utils'
import { typographyLight } from '../styles'
import style from './styles/header.cssr.js'

export default (level) =>
  defineComponent({
    name: 'H' + level,
    props: {
      ...useTheme.props,
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
    setup (props) {
      const themeRef = useTheme(
        'Typography',
        'H',
        style,
        typographyLight,
        props
      )
      return {
        cssVars: computed(() => {
          const { type } = props
          const {
            common: { cubicBezierEaseInOut },
            self: {
              headerFontWeight,
              headerTextColor,
              [`headerPrefixWidth${level}`]: prefixWidth,
              [`headerFontSize${level}`]: fontSize,
              [`headerMargin${level}`]: margin,
              [`headerBarWidth${level}`]: barWidth,
              [createKey('headerBarColor', type)]: barColor
            }
          } = themeRef.value
          return {
            '--bezier': cubicBezierEaseInOut,
            '--font-size': fontSize,
            '--margin': margin,
            '--bar-color': barColor,
            '--bar-width': barWidth,
            '--font-weight': headerFontWeight,
            '--text-color': headerTextColor,
            '--prefix-width': prefixWidth
          }
        })
      }
    },
    render () {
      const { prefix, alignText, cssVars } = this
      return h(
        `h${level}`,
        {
          class: [
            'n-h',
            `n-h${level}`,
            {
              'n-h--prefix-bar': prefix,
              'n-h--align-text': alignText
            }
          ],
          style: cssVars
        },
        getSlot(this)
      )
    }
  })
