import { h, defineComponent, PropType, inject } from 'vue'
import { indexMap } from 'seemly'
import { useConfig } from '../../_mixins'
import { carouselMethodsInjectionKey } from './interface'
import { ExtractPublicPropTypes } from '../../_utils'

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
    const { slideTo } = inject(carouselMethodsInjectionKey, null)!
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
      dotStyle
    } = this
    return (
      <div
        class={[
          `${mergedClsPrefix}-carousel__dots`,
          `${mergedClsPrefix}-carousel__dots--${dotStyle}`
        ]}
        role='tablist'
      >
        {indexMap(total, i => {
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
        })}
      </div>
    )
  }
})
