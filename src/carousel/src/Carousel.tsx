import { h, defineComponent } from 'vue'
import { useConfig } from '../../../es/_mixins'
import { ExtractPublicPropTypes } from '../../_utils'

const carouselProps = {}

export type CarouselProps = ExtractPublicPropTypes<typeof carouselProps>

export default defineComponent({
  name: 'Carousel',
  setup (props) {
    const { mergedClsPrefixRef } = useConfig(props)
    return {
      mergedClsPrefix: mergedClsPrefixRef
    }
  },
  render () {
    const { mergedClsPrefix } = this
    return <div class={`${mergedClsPrefix}-carousel`}>123</div>
  }
})
