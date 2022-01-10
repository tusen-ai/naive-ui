import { h, defineComponent, inject, Fragment } from 'vue'
import { BackwardIcon, ForwardIcon } from '../../_internal/icons'
import { useConfig } from '../../_mixins'
import { carouselMethodsInjectionKey } from './interface'

export default defineComponent({
  name: 'CarouselArrow',
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const {
      isVertical,
      isPrevDisabled,
      isNextDisabled,
      slidePrev,
      slideNext
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    } = inject(carouselMethodsInjectionKey, null)!
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      isVertical,
      isPrevDisabled,
      isNextDisabled,
      slidePrev,
      slideNext
    }
  },
  render () {
    const { mergedClsPrefix } = this
    const isVertical = this.isVertical()
    return (
      <Fragment>
        <div
          class={[
            `${mergedClsPrefix}-carousel__arrow`,
            `${mergedClsPrefix}-carousel__arrow--${
              isVertical ? 'bottom' : 'right'
            }`,
            this.isNextDisabled() &&
              `${mergedClsPrefix}-carousel__arrow--disabled`
          ]}
          role="button"
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
            this.isPrevDisabled() &&
              `${mergedClsPrefix}-carousel__arrow--disabled`
          ]}
          role="button"
          onClick={this.slidePrev}
        >
          <BackwardIcon />
        </div>
      </Fragment>
    )
  }
})
