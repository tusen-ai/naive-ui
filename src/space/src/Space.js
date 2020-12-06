import { h } from 'vue'
import { flatten, getSlot } from '../../_utils'
import {
  configurable,
  themeable
} from '../../_mixins'

const HORIZONTAL_MARGIN = {
  small: '8px',
  medium: '12px',
  large: '16px'
}

const VERTICAL_MARGIN = {
  small: '8px',
  medium: '12px',
  large: '16px'
}

export default {
  name: 'Space',
  mixins: [
    configurable,
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
          'center',
          'flex-end',
          'flex-start'
        ].includes(value)
      },
      default: undefined
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
    const lastIndex = children.length - 1
    return h('div', {
      class: 'n-space',
      style: {
        display: inline ? 'inline-flex' : 'flex',
        flexDirection: vertical ? 'column' : 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-' + justify,
        marginBottom: vertical ? null : `-${verticalMargin}`,
        alignItems: align
      }
    }, children.map((child, index) => h('div', {
      style: [
        itemStyle,
        {
          maxWidth: '100%'
        },
        vertical ? {
          marginBottom: index !== lastIndex ? verticalMargin : null
        } : {
          marginRight: index !== lastIndex ? horizontalMargin : null,
          marginBottom: verticalMargin
        }
      ]
    }, [
      child
    ])))
  }
}
