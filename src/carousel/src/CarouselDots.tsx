import { h, defineComponent, PropType, inject } from 'vue'
import { indexMap } from 'seemly'
import { useConfig } from '../../_mixins'
import { carouselMethodsInjectionKey } from './interface'
import type { ExtractPublicPropTypes } from '../../_utils'

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
  keyboard: Boolean,
  dotStyle: {
    type: String as PropType<'dot' | 'line' | 'never'>,
    default: 'dot'
  }
}

export type CarouselDotsProps = ExtractPublicPropTypes<typeof carouselDotsProps>

export default defineComponent({
  name: 'CarouselDots',
  props: carouselDotsProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NCarousel = inject(carouselMethodsInjectionKey, null)!
    function handleKeydown (e: KeyboardEvent, current: number): void {
      switch (e.code) {
        case 'Enter':
        case 'NumpadEnter':
        case 'Space':
          NCarousel.slideTo(current)
          return
      }
      if (props.keyboard) {
        handleKeyboard(e)
      }
    }
    function handleMouseenter (current: number): void {
      if (props.trigger === 'hover') {
        NCarousel.slideTo(current)
      }
    }
    function handleClick (current: number): void {
      if (props.trigger === 'click') {
        NCarousel.slideTo(current)
      }
    }
    function handleKeyboard (e: KeyboardEvent): void {
      const { code: keycode } = e
      const vertical = NCarousel.isVertical()
      const isVerticalNext = keycode === 'PageUp' || keycode === 'ArrowUp'
      const isVerticalPrev = keycode === 'PageDown' || keycode === 'ArrowDown'
      const isHorizontalNext = keycode === 'PageUp' || keycode === 'ArrowRight'
      const isHorizontalPrev = keycode === 'PageDown' || keycode === 'ArrowLeft'
      if (
        vertical &&
        ((isVerticalNext && NCarousel.isNextDisabled()) ||
          (isVerticalPrev && NCarousel.isPrevDisabled()))
      ) {
        return
      }
      if (
        !vertical &&
        ((isHorizontalNext && NCarousel.isNextDisabled()) ||
          (isHorizontalPrev && NCarousel.isPrevDisabled()))
      ) {
        return
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return
      }
      const nodeName = document.activeElement?.nodeName.toLowerCase()
      if (nodeName === 'input' || nodeName === 'textarea') {
        return
      }
      if (vertical ? isVerticalNext : isHorizontalNext) {
        e.preventDefault()
        NCarousel.slideNext()
      } else if (vertical ? isVerticalPrev : isHorizontalPrev) {
        e.preventDefault()
        NCarousel.slidePrev()
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
    const { mergedClsPrefix, total, current, dotStyle } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-carousel__dots`,
          `${mergedClsPrefix}-carousel__dots--${dotStyle}`
        ]}
        role='tablist'
      >
        {indexMap(total, (i) => {
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
              onKeydown={(e) => this.handleKeydown(e, i)}
            />
          )
        })}
      </div>
    )
  }
})
