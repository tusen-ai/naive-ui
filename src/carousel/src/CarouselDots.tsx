import { h, defineComponent, PropType, inject } from 'vue'
import { indexMap } from 'seemly'
import { useConfig } from '../../_mixins'
import { ExtractPublicPropTypes } from '../../_utils'
import {
  CarouselMethodsInjection,
  carouselMethodsInjectionKey
} from './interface'

const carouselDotsProps = {
  total: {
    type: Number,
    default: 0
  },
  current: {
    type: Number,
    default: 0
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  },
  dotStyle: {
    type: String as PropType<'dot' | 'line' | 'progress' | 'never'>,
    default: 'dot'
  },
  speed: {
    type: Number,
    default: 300
  },
  dotPlacement: {
    type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
    default: 'bottom'
  }
}

export type CarouselDotsProps = ExtractPublicPropTypes<typeof carouselDotsProps>

export default defineComponent({
  name: 'CarouselDots',
  props: carouselDotsProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const { slideTo } = inject(
      carouselMethodsInjectionKey,
      null
    ) as CarouselMethodsInjection
    function handleKeydown (e: KeyboardEvent, current: number): void {
      switch (e.code) {
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          slideTo(current)
      }
    }
    function handleMouseenter (current: number): void {
      if (props.trigger === 'hover') {
        slideTo(current)
      }
    }
    function handleClick (current: number): void {
      if (props.trigger === 'click') {
        slideTo(current)
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      handleKeydown,
      handleMouseenter,
      handleClick
    }
  },
  render () {
    const {
      mergedClsPrefix,
      total,
      current,
      speed,
      dotPlacement,
      dotStyle
    } = this
    const isVersical = dotPlacement === 'left' || dotPlacement === 'right'
    const progress = (current + 1) / total
    return (
      <div
        class={[
          `${mergedClsPrefix}-carousel__dots`,
          `${mergedClsPrefix}-carousel__dots--${dotStyle}`
        ]}
        role='tablist'
      >
        {dotStyle === 'progress' ? (
          <div
            class={`${mergedClsPrefix}-carousel__dots-fill`}
            style={{
              transform: `translate3d(0px, 0px, 0px) scaleX(${
                isVersical ? 1 : progress
              }) scaleY(${isVersical ? progress : 1})`,
              transitionDuration: `${speed}ms`
            }}
          ></div>
        ) : (
          indexMap(total, i => {
            const selected = i === current
            return (
              <div
                aria-selected={selected}
                role='button'
                tabindex='0'
                class={[
                  `${mergedClsPrefix}-carousel__dot`,
                  selected && `${mergedClsPrefix}-carousel__dot--active`
                ]}
                onClick={() => this.handleClick(i)}
                onMouseenter={() => this.handleMouseenter(i)}
                onKeydown={e => this.handleKeydown(e, i)}
              />
            )
          })
        )}
      </div>
    )
  }
})
