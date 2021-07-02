import {
  computed,
  defineComponent,
  h,
  inject,
  ref,
  PropType,
  ImgHTMLAttributes
} from 'vue'
import NImagePreview from './ImagePreview'
import type { ImagePreviewInst } from './ImagePreview'
import { imageGroupInjectionKey } from './ImageGroup'
import { ExtractPublicPropTypes } from '../../_utils'
import { useConfig } from '../../_mixins'

const imageProps = {
  alt: String,
  height: [String, Number] as PropType<string | number>,
  imgProps: Object as PropType<ImgHTMLAttributes>,
  width: [String, Number] as PropType<string | number>,
  src: String,
  showToolbar: { type: Boolean, default: true }
}

export type ImageProps = ExtractPublicPropTypes<typeof imageProps>

export default defineComponent({
  name: 'Image',
  props: imageProps,
  setup (props) {
    const imageRef = ref<HTMLImageElement | null>(null)
    const imgPropsRef = props.imgProps || {}
    const previewInstRef = ref<ImagePreviewInst | null>(null)
    const imageGroupHandle = inject(imageGroupInjectionKey, null)
    const { mergedClsPrefixRef } = imageGroupHandle || useConfig(props)
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedWidth: computed(() =>
        props.width ? props.width : imgPropsRef.width
      ),
      mergedHeight: computed(() =>
        props.height ? props.height : imgPropsRef.height
      ),
      mergedSrc: computed(() => (props.src ? props.src : imgPropsRef.src)),
      mergedAlt: computed(() => (props.alt ? props.alt : imgPropsRef.alt)),
      groupId: imageGroupHandle?.groupId,
      previewInstRef,
      imageRef,
      imgProps: imgPropsRef,
      handleClick: () => {
        if (imageGroupHandle) {
          imageGroupHandle.setPreviewSrc(props.src)
          imageGroupHandle.setThumbnailEl(imageRef.value)
          imageGroupHandle.toggleShow()
          return
        }
        const { value: previewInst } = previewInstRef
        if (!previewInst) return
        previewInst.setPreviewSrc(props.src)
        previewInst.setThumbnailEl(imageRef.value)
        previewInst.toggleShow()
      }
    }
  },
  render () {
    const { mergedClsPrefix, imgProps } = this

    return this.groupId ? (
      <div class={`${mergedClsPrefix}-image`} role="none">
        <img
          {...imgProps}
          class={this.groupId}
          ref="imageRef"
          width={this.mergedWidth}
          height={this.mergedHeight}
          src={this.mergedSrc}
          alt={this.mergedAlt}
          aria-label={this.mergedAlt}
          onClick={this.handleClick}
        />
      </div>
    ) : (
      <NImagePreview
        clsPrefix={mergedClsPrefix}
        ref="previewInstRef"
        showToolbar={this.showToolbar}
      >
        {{
          default: () => {
            return (
              <div class={`${mergedClsPrefix}-image`} role="none">
                <img
                  ref="imageRef"
                  {...imgProps}
                  width={this.mergedWidth}
                  height={this.mergedHeight}
                  src={this.mergedSrc}
                  alt={this.mergedAlt}
                  aria-label={this.mergedAlt}
                  onClick={this.handleClick}
                />
              </div>
            )
          }
        }}
      </NImagePreview>
    )
  }
})
