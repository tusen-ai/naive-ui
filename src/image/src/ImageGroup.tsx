import {
  defineComponent,
  h,
  ref,
  provide,
  InjectionKey,
  renderSlot,
  getCurrentInstance
} from 'vue'
import { createId } from 'seemly'
import NImagePreview from './ImagePreview'
import type { ImagePreviewInst } from './ImagePreview'

export const imageGroupInjectionKey: InjectionKey<
ImagePreviewInst & { groupId: string }
> = Symbol('image-group')

export default defineComponent({
  name: 'ImageGroup',
  props: {
    showToolbar: { type: Boolean, default: true }
  },
  setup () {
    let currentSrc: string | undefined
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
      previewInstRef,
      next: () => go(1),
      prev: () => go(-1)
    }
  },
  render () {
    return (
      <NImagePreview
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
