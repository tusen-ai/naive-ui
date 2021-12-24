import {
  h,
  defineComponent,
  renderSlot,
  inject,
  computed,
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'
import { useConfig } from '../../_mixins'
import { throwError } from '../../_utils'
import { CarouselSlideInjection, carouselSlideInjectionKey } from './interface'

export default defineComponent({
  name: 'CarouselItem',
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const NCarousel = inject(
      carouselSlideInjectionKey,
      null
    ) as CarouselSlideInjection
    if (!NCarousel) {
      throwError(
        'carousel-item',
        '`n-carousel-item` must be placed inside `n-carousel`.'
      )
    }
    const selfRef = ref<HTMLElement | null>(null)
    const isPrevRef = computed(
      () => selfRef.value && NCarousel.isPrev(selfRef.value)
    )
    const isNextRef = computed(
      () => selfRef.value && NCarousel.isNext(selfRef.value)
    )
    const isActiveRef = computed(
      () => selfRef.value && NCarousel.isActive(selfRef.value)
    )
    const styleRef = computed(
      () => selfRef.value && NCarousel.getSlideStyle(selfRef.value)
    )
    const indexRef = computed(
      () => selfRef.value && NCarousel.getSlideIndex(selfRef.value)
    )
    onMounted(() => NCarousel.addSlide(selfRef.value as HTMLElement))
    onBeforeUnmount(() => NCarousel.removeSlide(selfRef.value as HTMLElement))
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selfRef,
      isPrev: isPrevRef,
      isNext: isNextRef,
      isActive: isActiveRef,
      index: indexRef,
      style: styleRef
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
        ref='selfRef'
        class={className}
        role='option'
        data-index={index}
        aria-hidden={!isActive}
        style={style}
      >
        {renderSlot(slots, 'default', {
          isPrev,
          isNext,
          isActive,
          index
        })}
      </div>
    )
  }
})
