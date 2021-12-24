import { h, defineComponent, PropType, inject, Fragment } from 'vue'
import { useConfig } from '../../_mixins'
import { ExtractPublicPropTypes } from '../../_utils'
import { BackwardIcon, ForwardIcon } from '../../_internal/icons'
import {
  CarouselSlideInjection,
  carouselSlideInjectionKey,
  Direction
} from './interface'

const carouselArrowProps = {
  direction: {
    type: String as PropType<Direction>,
    default: 'horizontal'
  },
  keyboard: Boolean
}

export type CarouselArrowProps = ExtractPublicPropTypes<
  typeof carouselArrowProps
>

export default defineComponent({
  name: 'CarouselArrow',
  props: carouselArrowProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const { slidePrev, slideNext } = inject(
      carouselSlideInjectionKey,
      null
    ) as CarouselSlideInjection
    function handleKeydown (e: KeyboardEvent): void {
      if (!props.keyboard) return
      switch (e.code) {
        case 'ArrowRight':
          slideNext()
          break
        case 'ArrowLeft':
          slidePrev()
          break
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      slidePrev,
      slideNext,
      handleKeydown
    }
  },
  render () {
    const { mergedClsPrefix, direction } = this
    const isVertical = direction === 'vertical'
    return (
      <Fragment>
        <div
          class={[
            `${mergedClsPrefix}-carousel__arrow`,
            `${mergedClsPrefix}-carousel__arrow--${
              isVertical ? 'bottom' : 'right'
            }`
          ]}
          tabindex={this.keyboard ? 0 : -1}
          role='button'
          onClick={this.slideNext}
          onKeydown={this.handleKeydown}
        >
          <ForwardIcon />
        </div>
        <div
          class={[
            `${mergedClsPrefix}-carousel__arrow`,
            `${mergedClsPrefix}-carousel__arrow--${isVertical ? 'top' : 'left'}`
          ]}
          role='button'
          onClick={this.slidePrev}
          onKeydown={this.handleKeydown}
        >
          <BackwardIcon />
        </div>
      </Fragment>
    )
  }
})
