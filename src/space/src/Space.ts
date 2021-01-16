import { h, defineComponent, computed, PropType } from 'vue'
import { depx } from 'seemly'
import { createKey, flatten, getSlot } from '../../_utils'
import { useTheme } from '../../_mixins'
import type { ThemeProps } from '../../_mixins'
import { spaceLight } from '../styles'
import type { SpaceTheme } from '../styles'

type Align =
  | 'stretch'
  | 'baseline'
  | 'start'
  | 'end'
  | 'center'
  | 'flex-end'
  | 'flex-start'

export default defineComponent({
  name: 'Space',
  props: {
    ...(useTheme.props as ThemeProps<SpaceTheme>),
    align: {
      type: String as PropType<Align>,
      default: undefined
    },
    justify: {
      type: String as PropType<'start' | 'end'>,
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
      type: [String, Array] as PropType<
        'small' | 'medium' | 'large' | [number, number]
      >,
      default: 'medium'
    },
    itemStyle: {
      type: [String, Object],
      default: undefined
    }
  },
  setup (props) {
    const themeRef = useTheme('Space', 'Space', undefined, spaceLight, props)
    return {
      margin: computed<{ horizontal: number; vertical: number }>(() => {
        const { size } = props
        if (Array.isArray(size)) {
          return {
            horizontal: size[0],
            vertical: size[1]
          }
        }
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
    const { vertical, align, inline, justify, itemStyle, margin } = this
    const children = flatten(getSlot(this))
    const horizontalMargin = margin.horizontal + 'px'
    const verticalMargin = margin.vertical + 'px'
    const semiVerticalMargin = margin.vertical / 2 + 'px'
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
