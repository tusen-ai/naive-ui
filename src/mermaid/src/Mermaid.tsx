import type { ImgHTMLAttributes, PropType } from 'vue'
import type { MermaidConfig, ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { MermaidTheme } from '../styles/light'
import { NImage } from 'naive-ui'
import { createId } from 'seemly'
import { computed, defineComponent, h, ref, watchEffect } from 'vue'
import { useConfig, useMermaid, useTheme } from '../../_mixins'
import mermaidLight from '../styles/light'
import { mermaidThemes } from './const'
import { useMermaidContent } from './hooks/useMermaidContent'
import style from './styles/index.cssr'

export const mermaidProps = {
  ...(useTheme.props as ThemeProps<MermaidTheme>),
  value: {
    type: String,
    default: ''
  },
  previewDisabled: {
    type: Boolean,
    default: false
  },
  objectFit: {
    type: String as PropType<
      'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    >,
    default: 'contain'
  },
  imgProps: Object as PropType<ImgHTMLAttributes>,
  previewedImgProps: Object as PropType<ImgHTMLAttributes>,
  mermaidTheme: {
    type: String as PropType<MermaidConfig['theme']>,
    default: 'default'
  },
  themeVariables: {
    type: Object as PropType<Record<string, any>>,
    default: undefined
  }
}

export type MermaidProps = ExtractPublicPropTypes<typeof mermaidProps>

export default defineComponent({
  name: 'Mermaid',
  props: mermaidProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const themeRef = useTheme(
      'Mermaid',
      '-mermaid',
      style,
      mermaidLight,
      props,
      mergedClsPrefixRef
    )

    const background = computed(() => {
      return mermaidThemes.find(item => item.id === props.mermaidTheme)
        ?.background
    })

    const mermaid = useMermaid(props)

    const batchId = createId()
    const { svg, isLoading } = useMermaidContent(mermaid, props.value, {
      id: `mermaid-${batchId}`,
      theme: props.mermaidTheme,
      themeVariables: props.themeVariables
    })

    const blobUrl = ref('')

    watchEffect(() => {
      if (isLoading.value || !svg.value)
        return
      const svgBlob = new Blob([svg.value], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(svgBlob)
      blobUrl.value = url
    })

    return {
      mergedTheme: themeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      blobUrl,
      background
    }
  },
  render() {
    const { mergedClsPrefix, blobUrl } = this
    return (
      <div class={[`${mergedClsPrefix}-mermaid`]}>
        {blobUrl && (
          <NImage
            class={`${mergedClsPrefix}-mermaid-contain`}
            height="auto"
            src={blobUrl}
            alt="mermaid"
            objectFit={this.objectFit}
            previewDisabled={this.previewDisabled}
            imgProps={{
              style: { background: this.background },
              ...this.imgProps
            }}
            previewedImgProps={{
              style: { background: this.background },
              ...this.previewedImgProps
            }}
          />
        )}
      </div>
    )
  }
})
