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

type Justify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'
const spaceProps = {
  ...(useTheme.props as ThemeProps<SpaceTheme>),
  align: String as PropType<Align>,
  justify: {
    type: String as PropType<Justify>,
    default: 'start'
  },
  inline: Boolean,
  vertical: Boolean,
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
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Space',
      'Space',
      undefined,
      spaceLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
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
      mergedClsPrefix
    } = this
    const children = flatten(getSlot(this))
    const horizontalMargin = `${margin.horizontal}px`
    const verticalMargin = `${margin.vertical}px`
    const semiVerticalMargin = `${margin.vertical / 2}px`
    const lastIndex = children.length - 1
    return (
      <div
        role="none"
        class={`${mergedClsPrefix}-space`}
        style={{
          display: inline ? 'inline-flex' : 'flex',
          flexDirection: vertical ? 'column' : 'row',
          flexWrap: !wrap ? 'nowrap' : 'wrap',
          justifyContent: ['start', 'end'].includes(justify)
            ? 'flex-' + justify
            : justify,
          marginTop: vertical ? '' : `-${semiVerticalMargin}`,
          marginBottom: vertical ? '' : `-${semiVerticalMargin}`,
          alignItems: align
        }}
      >
        {children.map((child, index) => (
          <div
            role="none"
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
