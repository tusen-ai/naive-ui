import {
  h,
  defineComponent,
  inject,
  computed,
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { useConfig } from '../../_mixins'
import { throwError } from '../../_utils'
import { carouselMethodsInjectionKey } from './interface'

export default defineComponent({
  name: 'CarouselItem',
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const NCarousel = inject(carouselMethodsInjectionKey, null)
    if (!NCarousel) {
      throwError(
        'carousel-item',
        '`n-carousel-item` must be placed inside `n-carousel`.'
      )
    }
    const selfElRef = ref<HTMLElement>()
    const isPrevRef = computed(() => {
      const { value: selfEl } = selfElRef
      return Boolean(selfEl && NCarousel.isPrev(selfEl))
    })
    const isNextRef = computed(() => {
      const { value: selfEl } = selfElRef
      return Boolean(selfEl && NCarousel.isNext(selfEl))
    })
    const isActiveRef = computed(() => {
      const { value: selfEl } = selfElRef
      return Boolean(selfEl && NCarousel.isActive(selfEl))
    })
    const styleRef = computed(() => {
      const { value: selfEl } = selfElRef
      return selfEl && NCarousel.getSlideStyle(selfEl)
    })
    const indexRef = computed(() => {
      const { value: selfEl } = selfElRef
      return selfEl && NCarousel.getSlideIndex(selfEl)
    })
    function handleClick (event: MouseEvent): void {
      const { value: index } = indexRef
      if (index !== undefined) {
        NCarousel?.onCarouselItemClick(index, event)
      }
    }
    onMounted(() => NCarousel.addSlide(selfElRef.value))
    onBeforeUnmount(() => {
      NCarousel.removeSlide(selfElRef.value)
    })
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      isPrev: isPrevRef,
      isNext: isNextRef,
      isActive: isActiveRef,
      index: indexRef,
      style: styleRef,
      prevSlideStyle: NCarousel.prevSlideStyleRef,
      nextSlideStyle: NCarousel.nextSlideStyleRef,
      handleClick
    }
  },
  render () {
    const {
      $slots: slots,
      mergedClsPrefix,
      isPrev,
      isNext,
      isActive,
      index,
      style
    } = this
    const className = [
      `${mergedClsPrefix}-carousel__slide`,
      {
        [`${mergedClsPrefix}-carousel__slide--current`]: isActive,
        [`${mergedClsPrefix}-carousel__slide--prev`]: isPrev,
        [`${mergedClsPrefix}-carousel__slide--next`]: isNext
      }
    ]
    return (
      <div
        ref="selfElRef"
        class={className}
        role="option"
        tabindex="-1"
        data-index={index}
        aria-hidden={!isActive}
        style={[
          style,
          isPrev ? this.prevSlideStyle : '',
          isNext ? this.nextSlideStyle : ''
        ]}
        // We use ts-ignore for vue-tsc, since it seems to patch native event
        // for vue components
        // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
        // @ts-ignore
        onClickCapture={this.handleClick}
      >
        {slots.default?.({
          isPrev,
          isNext,
          isActive,
          index
        })}
      </div>
    )
  }
})
