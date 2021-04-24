import { pxfy } from 'seemly'
import {
  computed,
  defineComponent,
  h,
  PropType,
  Fragment,
  mergeProps
} from 'vue'
import { ThemeProps, useConfig, useTheme } from '../../_mixins'
import { createKey, useHoudini } from '../../_utils'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { SkeletonTheme } from '../styles'
import { skeletonLight } from '../styles'
import style from './styles/index.cssr'

const skeletonProps = {
  ...(useTheme.props as ThemeProps<SkeletonTheme>),
  text: Boolean,
  round: Boolean,
  circle: Boolean,
  height: [String, Number] as PropType<string | number>,
  width: [String, Number] as PropType<string | number>,
  size: String as PropType<'small' | 'medium' | 'large'>,
  repeat: {
    type: Number,
    default: 1
  },
  animated: {
    type: Boolean,
    default: true
  },
  sharp: {
    type: Boolean,
    default: true
  }
} as const

export type SkeletonProps = ExtractPublicPropTypes<typeof skeletonProps>

export default defineComponent({
  name: 'Skeleton',
  inheritAttrs: false,
  props: skeletonProps,
  setup (props) {
    useHoudini()
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Skeleton',
      'Skeleton',
      style,
      skeletonLight,
      props,
      mergedClsPrefixRef
    )
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      style: computed(() => {
        const theme = themeRef.value
        const {
          common: { cubicBezierEaseInOut }
        } = theme
        const selfThemeVars = theme.self
        const { color, colorEnd, borderRadius } = selfThemeVars
        let sizeHeight: string | undefined
        const {
          circle,
          sharp,
          round,
          width,
          height,
          size,
          text,
          animated
        } = props
        if (size !== undefined) {
          sizeHeight = selfThemeVars[createKey('height', size)]
        }
        const mergedWidth = circle ? width ?? height ?? sizeHeight : width
        const mergedHeight = (circle ? width ?? height : height) ?? sizeHeight
        return {
          display: text ? 'inline-block' : '',
          verticalAlign: text ? '-0.125em' : '',
          borderRadius: circle
            ? '50%'
            : round
              ? '4096px'
              : sharp
                ? ''
                : borderRadius,
          width:
            typeof mergedWidth === 'number' ? pxfy(mergedWidth) : mergedWidth,
          height:
            typeof mergedHeight === 'number'
              ? pxfy(mergedHeight)
              : mergedHeight,
          animation: !animated ? 'none' : '',
          '--bezier': cubicBezierEaseInOut,
          '--color-start': color,
          '--color-end': colorEnd
        }
      })
    }
  },
  render () {
    const { repeat, style, mergedClsPrefix, $attrs } = this
    // BUG:
    // Chrome devtools can't read the element
    // Maybe it's a bug of chrome
    const child = h(
      'div',
      mergeProps(
        {
          class: `${mergedClsPrefix}-skeleton`,
          style: style
        },
        $attrs
      )
    )
    if (repeat > 1) {
      return (
        <>
          {Array.apply(null, { length: repeat } as any).map((_) => [
            child,
            '\n'
          ])}
        </>
      )
    }
    return child
  }
})
