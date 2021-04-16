import { h, defineComponent, computed, PropType, CSSProperties } from 'vue'
import { depx, getGap } from 'seemly'
import { createKey, flatten, getSlot } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useConfig, useTheme } from '../../_mixins'
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

const spaceProps = {
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
    type: [String, Number, Array] as PropType<
    'small' | 'medium' | 'large' | number | [number, number]
    >,
    default: 'medium'
  },
  itemStyle: [String, Object] as PropType<string | CSSProperties>,
  wrap: {
    type: Boolean,
    default: true
  }
} as const

export type SpaceProps = ExtractPublicPropTypes<typeof spaceProps>

export default defineComponent({
  name: 'Space',
  props: spaceProps,
  setup (props) {
    const { mergedClsPrefix } = useConfig(props)
    const themeRef = useTheme(
      'Space',
      'Space',
      undefined,
      spaceLight,
      props,
      mergedClsPrefix
    )
    return {
      cPrefix: mergedClsPrefix,
      margin: computed<{ horizontal: number, vertical: number }>(() => {
        const { size } = props
        if (Array.isArray(size)) {
          return {
            horizontal: size[0],
            vertical: size[1]
          }
        }
        if (typeof size === 'number') {
          return {
            horizontal: size,
            vertical: size
          }
        }
        const {
          self: { [createKey('gap', size)]: gap }
        } = themeRef.value
        const { row, col } = getGap(gap)
        return {
          horizontal: depx(col),
          vertical: depx(row)
        }
      })
    }
  },
  render () {
    const {
      vertical,
      align,
      inline,
      justify,
      itemStyle,
      margin,
      wrap,
      cPrefix
    } = this
    const children = flatten(getSlot(this))
    const horizontalMargin = `${margin.horizontal}px`
    const verticalMargin = `${margin.vertical}px`
    const semiVerticalMargin = `${margin.vertical / 2}px`
    const lastIndex = children.length - 1
    return (
      <div
        class={`${cPrefix}-space`}
        style={{
          display: inline ? 'inline-flex' : 'flex',
          flexDirection: vertical ? 'column' : 'row',
          flexWrap: !wrap ? 'nowrap' : 'wrap',
          justifyContent: 'flex-' + justify,
          marginTop: vertical ? '' : `-${semiVerticalMargin}`,
          marginBottom: vertical ? '' : `-${semiVerticalMargin}`,
          alignItems: align
        }}
      >
        {children.map((child, index) => (
          <div
            style={[
              itemStyle as any,
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
            ]}
          >
            {child}
          </div>
        ))}
      </div>
    )
  }
})
