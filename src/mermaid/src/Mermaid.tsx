import type { CSSProperties, ImgHTMLAttributes, PropType } from 'vue'
import type { ThemeProps } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { MermaidTheme } from '../styles/light'
import { NImage } from 'naive-ui'
import { createId } from 'seemly'
import { computed, defineComponent, h, ref, watchEffect } from 'vue'
import { useConfig, useTheme, useThemeClass } from '../../_mixins'
import mermaidLight from '../styles/light'
import { useMermaid } from './hooks/useMermaid'
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
  previewedImgProps: Object as PropType<ImgHTMLAttributes>
}

export type MermaidProps = ExtractPublicPropTypes<typeof mermaidProps>

export default defineComponent({
  name: 'Mermaid',
  props: mermaidProps,
  setup(props) {
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props)
    const themeRef = useTheme(
      'Mermaid',
      '-mermaid',
      style,
      mermaidLight,
      props,
      mergedClsPrefixRef
    )

    const cssVarsRef = computed(() => {
      // eslint-disable-next-line no-empty-pattern
      const {} = themeRef.value
      return {}
    })

    const themeClassHandle = inlineThemeDisabled
      ? useThemeClass('mermaid', undefined, cssVarsRef, props)
      : undefined

    const batchId = createId()
    const { svg, isLoading } = useMermaid(props.value, {
      id: `mermaid-${batchId}`
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
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle?.themeClass,
      onRender: themeClassHandle?.onRender,
      blobUrl
    }
  },
  render() {
    const { mergedClsPrefix, themeClass, onRender, blobUrl } = this
    onRender?.()
    return (
      <div
        style={this.cssVars as CSSProperties}
        class={[`${mergedClsPrefix}-mermaid`, themeClass]}
      >
        {blobUrl && (
          <NImage
            class={`${mergedClsPrefix}-mermaid-contain`}
            height="auto"
            src={blobUrl}
            alt="mermaid"
            objectFit={this.objectFit}
            previewDisabled={this.previewDisabled}
            imgProps={this.imgProps}
            previewedImgProps={this.previewedImgProps}
          />
        )}
      </div>
    )
  }
})
