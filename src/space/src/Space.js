import { h, defineComponent, computed } from 'vue'
import { createKey, flatten, getSlot } from '../../_utils'
import { useTheme } from '../../_mixins'
import { spaceLight } from '../styles'
import { depx } from 'seemly'

export default defineComponent({
  name: 'Space',
  props: {
    ...useTheme.props,
    align: {
      validator (value) {
        return [
          'stretch',
          'baseline',
          'start',
          'end',
          'center',
          'flex-end',
          'flex-start'
        ].includes(value)
      },
      default: undefined
    },
    justify: {
      validator (value) {
        return ['start', 'end'].includes(value)
      },
      default: 'start'
    },
    inline: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return (
          ['small', 'medium', 'large'].includes(value) ||
          typeof value === 'number'
        )
      },
      default: 'medium'
    },
    itemStyle: {
      type: [String, Object],
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Space', 'Space', null, spaceLight, props)
    return {
      margin: computed(() => {
        const { size } = props
        if (typeof size === 'number') return null
        const {
          self: {
            [createKey('marginHorizontal', size)]: marginHorizontal,
            [createKey('marginVertical', size)]: marginVertical
          }
        } = themeRef.value
        return {
          horizontal: depx(marginHorizontal),
          vertical: depx(marginVertical)
        }
      })
    }
  },
  render () {
    const { size, vertical, align, inline, justify, itemStyle, margin } = this
    const children = flatten(getSlot(this))
    const sizeIsNumber = typeof size === 'number'
    const horizontalMargin = (sizeIsNumber ? size : margin.horizontal) + 'px'
    const verticalMargin = (sizeIsNumber ? size : margin.vertical) + 'px'
    const semiVerticalMargin =
      (sizeIsNumber ? size : margin.vertical) / 2 + 'px'
    const lastIndex = children.length - 1
    return h(
      'div',
      {
        class: 'n-space',
        style: {
          display: inline ? 'inline-flex' : 'flex',
          flexDirection: vertical ? 'column' : 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-' + justify,
          marginTop: vertical ? '' : `-${semiVerticalMargin}`,
          marginBottom: vertical ? '' : `-${semiVerticalMargin}`,
          alignItems: align
        }
      },
      children.map((child, index) =>
        h(
          'div',
          {
            style: [
              itemStyle,
              {
                maxWidth: '100%'
              },
              vertical
                ? {
                  marginBottom: index !== lastIndex ? verticalMargin : ''
                }
                : {
                  marginRight: index !== lastIndex ? horizontalMargin : '',
                  paddingTop: semiVerticalMargin,
                  paddingBottom: semiVerticalMargin
                }
            ]
          },
          [child]
        )
      )
    )
  }
})
