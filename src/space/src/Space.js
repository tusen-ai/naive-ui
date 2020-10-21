import { h } from 'vue'
import { flatten, getSlot } from '../../_utils/vue'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'

const HORIZONTAL_MARGIN = {
  small: '4px',
  medium: '8px',
  large: '12px'
}

const VERTICAL_MARGIN = {
  small: '8px',
  medium: '12px',
  large: '16px'
}

export default {
  name: 'Space',
  mixins: [
    withapp,
    themeable
  ],
  props: {
    align: {
      validator (value) {
        return [
          'stretch',
          'baseline',
          'start',
          'end',
          'center'
        ].includes(value)
      },
      default: 'start'
    },
    justify: {
      validator (value) {
        return [
          'start',
          'end'
        ].includes(value)
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
        return [
          'small',
          'medium',
          'large'
        ].includes(value) || typeof value === 'number'
      },
      default: 'medium'
    },
    itemStyle: {
      type: [String, Object],
      default: undefined
    }
  },
  render () {
    const {
      size,
      vertical,
      align,
      inline,
      justify,
      itemStyle
    } = this
    const children = flatten(getSlot(this))
    const horizontalMargin = typeof size === 'number' ? size + 'px' : HORIZONTAL_MARGIN[size]
    const verticalMargin = typeof size === 'number' ? size + 'px' : VERTICAL_MARGIN[size]
    const marginRight = !vertical ? horizontalMargin : null
    const marginBottom = vertical ? verticalMargin : null
    const lastIndex = children.length - 1
    return h('div', {
      class: 'n-space',
      style: {
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: vertical ? 'column' : 'row',
        justifyContent: 'flex-' + justify,
        alignItems: align
      }
    }, children.map((child, index) => h('div', {
      style: [
        itemStyle,
        {
          marginRight: index !== lastIndex ? marginRight : null,
          marginBottom: index !== lastIndex ? marginBottom : null
        }
      ]
    }, [
      child
    ])))
  }
}
