import type { PropType, Ref } from 'vue'
import type { ImagePreviewInst } from './ImagePreview'
import type { ImageRenderToolbar } from './public-types'
import { isArray, isUndefined } from 'lodash-es'
import { createId } from 'seemly'
import { useMergedState } from 'vooks'
import {
  computed,
  defineComponent,
  h,
  provide,
  ref,
  toRef,
  toRefs,
  watch
} from 'vue'
import { useConfig } from '../../_mixins'
import { createInjectionKey, type ExtractPublicPropTypes } from '../../_utils'
import NImagePreview from './ImagePreview'
import { imagePreviewSharedProps } from './interface'

export const imageGroupInjectionKey = createInjectionKey<
  ImagePreviewInst & {
    groupId: string
    mergedClsPrefixRef: Ref<string>
    renderToolbarRef: Ref<ImageRenderToolbar | undefined>
    registerImageUrl: (id: number, url: string) => void
    toggleShow: (imageId: number) => void
  }
>('n-image-group')

export const imageGroupProps = {
  ...imagePreviewSharedProps,
  srcList: {
    type: Array as PropType<string[]>
  },
  current: {
    type: Number
  },
  defaultCurrent: {
    type: Number,
    default: 0
  },
  show: {
    type: Boolean,
    default: undefined
  },
  defaultShow: Boolean
}

export type ImageGroupProps = ExtractPublicPropTypes<typeof imageGroupProps>

export default defineComponent({
  name: 'ImageGroup',
  props: imageGroupProps,
  emit: ['update:show'],
  setup(props, { emit }) {
    const { srcList, show } = toRefs(props)

    const { mergedClsPrefixRef } = useConfig(props)
    const groupId = `c${createId()}`
    // const vm = getCurrentInstance()
    const previewInstRef = ref<ImagePreviewInst | null>(null)

    const uncontrolledShowRef = ref(props.defaultShow)
    const controlledShowRef = toRef(props, 'show')
    const mergedShowRef = useMergedState(controlledShowRef, uncontrolledShowRef)

    const propImageUrlMap = computed(
      () =>
        new Map(
          isArray(srcList?.value)
            ? srcList?.value.map((url, index) => [index, url])
            : []
        )
    )

    const imageUrlMap = ref(new Map(propImageUrlMap.value || []))

    const imageIdList = computed(() => Array.from(imageUrlMap.value.keys()))

    const imageCount = computed(() => imageIdList.value.length)

    function registerImageUrl(id: number, url: string) {
      if (!propImageUrlMap.value.has(id)) {
        imageUrlMap.value.set(id, url)
      }

      return function unRegisterPreviewUrl() {
        if (!propImageUrlMap.value.has(id)) {
          imageUrlMap.value.delete(id)
        }
      }
    }

    watch(propImageUrlMap, () => {
      imageUrlMap.value = new Map(propImageUrlMap.value || [])
    })

    const uncontrolledCurrentRef = ref(props.defaultCurrent)
    const controlledCurrentRef = toRef(props, 'current')
    const mergedCurrentRef = useMergedState(
      controlledCurrentRef,
      uncontrolledCurrentRef
    )

    const setCurrentIndex = (index: number) => {
      if (index !== mergedCurrentRef.value) {
        emit('change', index)
        emit('update:current', index)
        uncontrolledCurrentRef.value = index
      }
    }

    const currentId = computed(() => imageIdList.value[mergedCurrentRef.value])
    const setCurrentId = (nextId: number) => {
      const nextIndex = imageIdList.value.indexOf(nextId)
      if (nextIndex !== mergedCurrentRef.value) {
        setCurrentIndex(nextIndex)
      }
    }

    const currentUrl = computed(() => imageUrlMap.value.get(currentId.value))

    function onClose() {
      emit('update:show', !show.value)
      uncontrolledShowRef.value = false
    }

    const nextIndex = computed(() => {
      const findNext = (start: number, end: number) => {
        for (let i = start; i <= end; i++) {
          const id = imageIdList.value[i]
          if (imageUrlMap.value.get(id)) {
            return i
          }
        }
        return undefined
      }

      const next = findNext(mergedCurrentRef.value + 1, imageCount.value - 1)
      return isUndefined(next) ? findNext(0, mergedCurrentRef.value - 1) : next
    })

    const prevIndex = computed(() => {
      const findPrev = (start: number, end: number) => {
        for (let i = start; i >= end; i--) {
          const id = imageIdList.value[i]
          if (imageUrlMap.value.get(id)) {
            return i
          }
        }
        return undefined
      }

      const prev = findPrev(mergedCurrentRef.value - 1, 0)
      return isUndefined(prev)
        ? findPrev(imageCount.value - 1, mergedCurrentRef.value + 1)
        : prev
    })

    function go(step: 1 | -1): void {
      if (step === 1) {
        !isUndefined(prevIndex.value) && setCurrentIndex(nextIndex.value!)
        props.onPreviewNext?.()
      }
      else {
        !isUndefined(nextIndex.value) && setCurrentIndex(prevIndex.value!)
        props.onPreviewPrev?.()
      }
    }
    provide(imageGroupInjectionKey, {
      mergedClsPrefixRef,
      registerImageUrl,
      setThumbnailEl: (el) => {
        previewInstRef.value?.setThumbnailEl(el)
      },
      toggleShow: (imageId: number) => {
        emit('update:show', true)
        uncontrolledShowRef.value = true
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
