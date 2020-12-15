import { h } from 'vue'
import { flatten, getSlot } from '../../_utils'
import { configurable, themeable } from '../../_mixins'

const HORIZONTAL_MARGIN = {
  small: 8,
  medium: 12,
  large: 16
}

const VERTICAL_MARGIN = {
  small: 4,
  medium: 8,
  large: 12
}

export default {
  name: 'Space',
  mixins: [configurable, themeable],
  props: {
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
  render () {
    const { size, vertical, align, inline, justify, itemStyle } = this
    const children = flatten(getSlot(this))
    const sizeIsNumber = typeof size === 'number'
    const horizontalMargin =
      (sizeIsNumber ? size : HORIZONTAL_MARGIN[size]) + 'px'
    const verticalMargin = (sizeIsNumber ? size : VERTICAL_MARGIN[size]) + 'px'
    const semiVerticalMargin =
      (sizeIsNumber ? size : VERTICAL_MARGIN[size]) / 2 + 'px'
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
}
