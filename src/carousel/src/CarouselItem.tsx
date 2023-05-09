import {
  h,
  defineComponent,
  computed,
  ref,
  onMounted,
  onBeforeUnmount
} from 'vue'
import type { VNode } from 'vue'
import { camelCase } from 'lodash-es'
import { useConfig } from '../../_mixins'
import { useCarouselContext } from './CarouselContext'

const CarouselItemName = 'CarouselItem'

export const isCarouselItem = (child: VNode): boolean =>
  (child.type as any)?.name === CarouselItemName

export default defineComponent({
  name: CarouselItemName,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const NCarousel = useCarouselContext(
      camelCase(CarouselItemName),
      `n-${camelCase(CarouselItemName)}`
    )
    const selfElRef = ref<HTMLElement>()
    const indexRef = computed(() => {
      const { value: selfEl } = selfElRef
      return selfEl ? NCarousel.getSlideIndex(selfEl) : -1
    })
    const isPrevRef = computed(() => NCarousel.isPrev(indexRef.value))
    const isNextRef = computed(() => NCarousel.isNext(indexRef.value))
    const isActiveRef = computed(() => NCarousel.isActive(indexRef.value))
    const styleRef = computed(() => NCarousel.getSlideStyle(indexRef.value))
    onMounted(() => {
      NCarousel.addSlide(selfElRef.value)
    })
    onBeforeUnmount(() => {
      NCarousel.removeSlide(selfElRef.value)
    })
    function handleClick (event: MouseEvent): void {
      const { value: index } = indexRef
      if (index !== undefined) {
        NCarousel?.onCarouselItemClick(index, event)
      }
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      selfElRef,
      isPrev: isPrevRef,
      isNext: isNextRef,
      isActive: isActiveRef,
      index: indexRef,
      style: styleRef,
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
        style={style}
        // We use ts-ignore for vue-tsc, since it seems to patch native event
        // for vue components
        // @ts-expect-error vue's tsx has type for capture events
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
