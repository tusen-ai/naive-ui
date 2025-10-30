import type { PropType, Ref } from 'vue'
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils'
import type { ImagePreviewInst, ImageRenderToolbar } from './public-types'
import { createId } from 'seemly'
import { useMergedState } from 'vooks'
import { computed, defineComponent, h, provide, ref, toRef } from 'vue'
import { useConfig } from '../../_mixins'
import { call, createInjectionKey, throwError } from '../../_utils'

import NImagePreview from './ImagePreview'
import { imagePreviewSharedProps } from './interface'

export const imageGroupInjectionKey = createInjectionKey<
  ImagePreviewInst & {
    groupId: string
    mergedClsPrefixRef: Ref<string>
    renderToolbarRef: Ref<ImageRenderToolbar | undefined>
    registerImageUrl: (id: number, url: string) => () => void
    toggleShow: (imageId: string) => void
  }
>('n-image-group')

export const imageGroupProps = {
  ...imagePreviewSharedProps,
  srcList: Array as PropType<string[]>,
  current: Number,
  defaultCurrent: {
    type: Number,
    default: 0
  },
  show: {
    type: Boolean,
    default: undefined
  },
  defaultShow: Boolean,
  onUpdateShow: [Function, Array] as PropType<
    MaybeArray<(show: boolean) => void>
  >,
  'onUpdate:show': [Function, Array] as PropType<
    MaybeArray<(show: boolean) => void>
  >,
  onUpdateCurrent: [Function, Array] as PropType<
    MaybeArray<(current: number) => void>
  >,
  'onUpdate:current': [Function, Array] as PropType<
    MaybeArray<(current: number) => void>
  >
}

export type ImageGroupProps = ExtractPublicPropTypes<typeof imageGroupProps>

export default defineComponent({
  name: 'ImageGroup',
  props: imageGroupProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props)
    const groupId = `c${createId()}`
    const previewInstRef = ref<ImagePreviewInst | null>(null)

    const uncontrolledShowRef = ref(props.defaultShow)
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)

    const registeredImageUrlMap = ref(new Map<string, string>())

    const mergedImageUrlMap = computed(() => {
      if (props.srcList) {
        const map: Map<string, string> = new Map()
        props.srcList.forEach((url, index) => {
          map.set(`p${index}`, url)
        })
        return map
      }
      return registeredImageUrlMap.value
    })

    const imageIdListRef = computed(() =>
      Array.from(mergedImageUrlMap.value.keys())
    )

    const imageCountGetter = () => imageIdListRef.value.length

    function registerImageUrl(id: number, url: string) {
      if (props.srcList) {
        throwError(
          'image-group',
          '`n-image` can\'t be placed inside `n-image-group` when image group\'s `src-list` prop is set.'
        )
      }

      const sid = `r${id}`
      if (!registeredImageUrlMap.value.has(`r${sid}`)) {
        registeredImageUrlMap.value.set(sid, url)
      }

      return function unregisterPreviewUrl() {
        if (!registeredImageUrlMap.value.has(sid)) {
          registeredImageUrlMap.value.delete(sid)
        }
      }
    }

    const uncontrolledCurrentRef = ref(props.defaultCurrent)
    const controlledCurrentRef = toRef(props, 'current')
    const mergedCurrentRef = useMergedState(
      controlledCurrentRef,
      uncontrolledCurrentRef
    )

    const setCurrentIndex = (index: number) => {
      if (index !== mergedCurrentRef.value) {
        const { onUpdateCurrent, 'onUpdate:current': _onUpdateCurrent } = props
        if (onUpdateCurrent) {
          call(onUpdateCurrent, index)
        }
        if (_onUpdateCurrent) {
          call(_onUpdateCurrent, index)
        }
        uncontrolledCurrentRef.value = index
      }
    }

    const currentId = computed(
      () => imageIdListRef.value[mergedCurrentRef.value]
    )
    const setCurrentId = (nextId: string) => {
      const nextIndex = imageIdListRef.value.indexOf(nextId)
      if (nextIndex !== mergedCurrentRef.value) {
        setCurrentIndex(nextIndex)
      }
    }

    const currentUrl = computed(() =>
      mergedImageUrlMap.value.get(currentId.value)
    )

    function doUpdateShow(value: boolean): void {
      const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props
      if (onUpdateShow) {
        call(onUpdateShow, value)
      }
      if (_onUpdateShow) {
        call(_onUpdateShow, value)
      }
      uncontrolledShowRef.value = value
    }

    function onClose() {
      doUpdateShow(false)
    }

    const nextIndex = computed(() => {
      const findNext = (start: number, end: number) => {
        for (let i = start; i <= end; i++) {
          const id = imageIdListRef.value[i]
          if (mergedImageUrlMap.value.get(id)) {
            return i
          }
        }
        return undefined
      }

      const next = findNext(mergedCurrentRef.value + 1, imageCountGetter() - 1)
      return next === undefined ? findNext(0, mergedCurrentRef.value - 1) : next
    })

    const prevIndex = computed(() => {
      const findPrev = (start: number, end: number) => {
        for (let i = start; i >= end; i--) {
          const id = imageIdListRef.value[i]
          if (mergedImageUrlMap.value.get(id)) {
            return i
          }
        }
        return undefined
      }

      const prev = findPrev(mergedCurrentRef.value - 1, 0)
      return prev === undefined
        ? findPrev(imageCountGetter() - 1, mergedCurrentRef.value + 1)
        : prev
    })

    function go(step: 1 | -1): void {
      if (step === 1) {
        prevIndex.value !== undefined && setCurrentIndex(nextIndex.value!)
        props.onPreviewNext?.()
      }
      else {
        nextIndex.value !== undefined && setCurrentIndex(prevIndex.value!)
        props.onPreviewPrev?.()
      }
    }
    provide(imageGroupInjectionKey, {
      mergedClsPrefixRef,
      registerImageUrl,
      setThumbnailEl: (el) => {
        previewInstRef.value?.setThumbnailEl(el)
      },
      toggleShow: (imageId: string) => {
        doUpdateShow(true)
        setCurrentId(imageId)
      },
      groupId,
      renderToolbarRef: toRef(props, 'renderToolbar')
    })

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      previewInstRef,
      mergedShow: mergedShowRef,
      src: currentUrl,
      onClose,
      next: () => {
        go(1)
      },
      prev: () => {
        go(-1)
      }
    }
  },
  render() {
    return (
      <NImagePreview
        theme={this.theme}
        themeOverrides={this.themeOverrides}
        ref="previewInstRef"
        onPrev={this.prev}
        onNext={this.next}
        src={this.src}
        show={this.mergedShow}
        showToolbar={this.showToolbar}
        showToolbarTooltip={this.showToolbarTooltip}
        renderToolbar={this.renderToolbar}
        onClose={this.onClose}
      >
        {this.$slots}
      </NImagePreview>
    )
  }
})
