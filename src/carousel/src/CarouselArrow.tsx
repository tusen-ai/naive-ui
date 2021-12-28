import { h, defineComponent, PropType, inject, Fragment } from 'vue'
import { useConfig } from '../../_mixins'
import { ExtractPublicPropTypes } from '../../_utils'
import { BackwardIcon, ForwardIcon } from '../../_internal/icons'
import {
  CarouselMethodsInjection,
  carouselMethodsInjectionKey
} from './interface'

const carouselArrowProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
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
    const { slidePrev, slideNext, isDisabledPrev, isDisabledNext } = inject(
      carouselMethodsInjectionKey,
      null
    ) as CarouselMethodsInjection
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
      isDisabledPrev,
      isDisabledNext,
      handleKeydown
    }
  },
  render () {
    const { mergedClsPrefix, direction, keyboard } = this
    const isVertical = direction === 'vertical'
    return (
      <Fragment>
        <div
          class={[
            `${mergedClsPrefix}-carousel__arrow`,
            `${mergedClsPrefix}-carousel__arrow--${
              isVertical ? 'bottom' : 'right'
            }`,
            {
              [`${mergedClsPrefix}-carousel__arrow--disabled`]: this.isDisabledNext()
            }
          ]}
          tabindex={keyboard ? 0 : -1}
          role='button'
          onClick={this.slideNext}
          onKeydown={keyboard ? this.handleKeydown : undefined}
        >
          <ForwardIcon />
        </div>
        <div
          class={[
            `${mergedClsPrefix}-carousel__arrow`,
            `${mergedClsPrefix}-carousel__arrow--${
              isVertical ? 'top' : 'left'
            }`,
            {
              [`${mergedClsPrefix}-carousel__arrow--disabled`]: this.isDisabledPrev()
            }
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
