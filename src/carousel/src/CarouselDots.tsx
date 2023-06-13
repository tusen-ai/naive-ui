import { h, defineComponent, ref, onBeforeUpdate } from 'vue'
import type { PropType } from 'vue'
import { indexMap } from 'seemly'
import { useConfig } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import { useCarouselContext } from './CarouselContext'

const carouselDotsProps = {
  total: {
    type: Number,
    default: 0
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  dotType: {
    type: String as PropType<'dot' | 'line' | 'never'>,
    default: 'dot'
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  },
  keyboard: Boolean
}

export type CarouselDotsProps = ExtractPublicPropTypes<typeof carouselDotsProps>

export default defineComponent({
  name: 'CarouselDots',
  props: carouselDotsProps,
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const dotElsRef = ref<HTMLElement[]>([])
    const NCarousel = useCarouselContext()
    function handleKeydown (e: KeyboardEvent, current: number): void {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault()
          NCarousel.to(current)
          return
      }
      if (props.keyboard) {
        handleKeyboard(e)
      }
    }
    function handleMouseenter (current: number): void {
      if (props.trigger === 'hover') {
        NCarousel.to(current)
      }
    }
    function handleClick (current: number): void {
      if (props.trigger === 'click') {
        NCarousel.to(current)
      }
    }
    function handleKeyboard (e: KeyboardEvent): void {
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return
      }
      const nodeName = document.activeElement?.nodeName.toLowerCase()
      if (nodeName === 'input' || nodeName === 'textarea') {
        return
      }
      const { code: keycode } = e
      const isVerticalNext = keycode === 'PageUp' || keycode === 'ArrowUp'
      const isVerticalPrev = keycode === 'PageDown' || keycode === 'ArrowDown'
      const isHorizontalNext = keycode === 'PageUp' || keycode === 'ArrowRight'
      const isHorizontalPrev = keycode === 'PageDown' || keycode === 'ArrowLeft'
      const vertical = NCarousel.isVertical()
      const wantToNext = vertical ? isVerticalNext : isHorizontalNext
      const wantToPrev = vertical ? isVerticalPrev : isHorizontalPrev
      if (!wantToNext && !wantToPrev) {
        return
      }
      e.preventDefault()
      if (wantToNext && !NCarousel.isNextDisabled()) {
        NCarousel.next()
        focusDot(NCarousel.currentIndexRef.value)
      } else if (wantToPrev && !NCarousel.isPrevDisabled()) {
        NCarousel.prev()
        focusDot(NCarousel.currentIndexRef.value)
      }
    }
    function focusDot (index: number): void {
      dotElsRef.value[index]?.focus()
    }
    onBeforeUpdate(() => (dotElsRef.value.length = 0))
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      dotEls: dotElsRef,
      handleKeydown,
      handleMouseenter,
      handleClick
    }
  },
  render () {
    const { mergedClsPrefix, dotEls } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-carousel__dots`,
          `${mergedClsPrefix}-carousel__dots--${this.dotType}`
        ]}
        role="tablist"
      >
        {indexMap(this.total, (i) => {
          const selected = i === this.currentIndex
          return (
            <div
              aria-selected={selected}
              ref={(el) => dotEls.push(el as HTMLElement)}
              role="button"
              tabindex="0"
              class={[
                `${mergedClsPrefix}-carousel__dot`,
                selected && `${mergedClsPrefix}-carousel__dot--active`
              ]}
              key={i}
              onClick={() => {
                this.handleClick(i)
              }}
              onMouseenter={() => {
                this.handleMouseenter(i)
              }}
              onKeydown={(e) => {
                this.handleKeydown(e, i)
              }}
            />
          )
        })}
      </div>
    )
  }
})
