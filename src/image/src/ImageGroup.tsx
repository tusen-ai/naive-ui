import {
  defineComponent,
  h,
  ref,
  provide,
  InjectionKey,
  renderSlot,
  getCurrentInstance,
  Ref
} from 'vue'
import { createId } from 'seemly'
import NImagePreview from './ImagePreview'
import type { ImagePreviewInst } from './ImagePreview'
import { ExtractPublicPropTypes } from '../../_utils'
import { useConfig } from '../../_mixins'

export const imageGroupInjectionKey: InjectionKey<
ImagePreviewInst & { groupId: string, mergedClsPrefixRef: Ref<string> }
> = Symbol('image-group')

const imageGroupProps = {
  showToolbar: { type: Boolean, default: true }
}

export type ImageGroupProps = ExtractPublicPropTypes<typeof imageGroupProps>

export default defineComponent({
  name: 'ImageGroup',
  props: imageGroupProps,
  setup (props) {
    let currentSrc: string | undefined
    const { mergedClsPrefixRef } = useConfig(props)
    const groupId = createId()
    const vm = getCurrentInstance()
    const setPreviewSrc = (src: string | undefined): void => {
      currentSrc = src
      previewInstRef.value?.setPreviewSrc(src)
    }
    function go (step: 1 | -1): void {
      if (!vm?.proxy) return
      const container: HTMLElement = vm.proxy.$el.parentElement
      // use dom api since we can't get the correct order before all children are rendered
      const imgs = container.getElementsByClassName(
        groupId
      ) as HTMLCollectionOf<HTMLImageElement>
      if (!imgs.length) return
      const index = Array.from(imgs).findIndex((img) => img.src === currentSrc)
      if (~index) {
        setPreviewSrc(imgs[(index + step + imgs.length) % imgs.length].src)
      } else {
        setPreviewSrc(imgs[0].src)
      }
    }
    provide(imageGroupInjectionKey, {
      mergedClsPrefixRef,
      setPreviewSrc,
      setThumbnailEl: (el) => {
        previewInstRef.value?.setThumbnailEl(el)
      },
      toggleShow: () => {
        previewInstRef.value?.toggleShow()
      },
      groupId
    })
    const previewInstRef = ref<ImagePreviewInst | null>(null)
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      previewInstRef,
      next: () => go(1),
      prev: () => go(-1)
    }
  },
  render () {
    return (
      <NImagePreview
        clsPrefix={this.mergedClsPrefix}
        ref="previewInstRef"
        onPrev={this.prev}
        onNext={this.next}
        showToolbar={this.showToolbar}
      >
        {{
          default: () => renderSlot(this.$slots, 'default')
        }}
      </NImagePreview>
    )
  }
})
