import { h, defineComponent, PropType, inject, Fragment } from 'vue'
import { useConfig } from '../../_mixins'
import { BackwardIcon, ForwardIcon } from '../../_internal/icons'
import { carouselMethodsInjectionKey } from './interface'
import type { ExtractPublicPropTypes } from '../../_utils'

const carouselArrowProps = {
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  }
}

export type CarouselArrowProps = ExtractPublicPropTypes<
  typeof carouselArrowProps
>

export default defineComponent({
  name: 'CarouselArrow',
  props: carouselArrowProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { slidePrev, slideNext, isPrevDisabled, isNextDisabled } = inject(
      carouselMethodsInjectionKey,
      null
    )!
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      slidePrev,
      slideNext,
      isPrevDisabled,
      isNextDisabled
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
            }`,
            this.isNextDisabled() && `${mergedClsPrefix}-carousel__arrow--disabled`
          ]}
          role='button'
          onClick={this.slideNext}
        >
          <ForwardIcon />
        </div>
        <div
          class={[
            `${mergedClsPrefix}-carousel__arrow`,
            `${mergedClsPrefix}-carousel__arrow--${
              isVertical ? 'top' : 'left'
            }`,
            this.isPrevDisabled() && `${mergedClsPrefix}-carousel__arrow--disabled`
          ]}
          role='button'
          onClick={this.slidePrev}
        >
          <BackwardIcon />
        </div>
      </Fragment>
    )
  }
})
