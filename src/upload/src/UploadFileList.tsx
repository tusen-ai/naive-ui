import {
  computed,
  type CSSProperties,
  defineComponent,
  h,
  inject,
  type VNode
} from 'vue'
import { NFadeInExpandTransition } from '../../_internal'
import { throwError } from '../../_utils'
import { NImageGroup } from '../../image'
import { uploadInjectionKey } from './interface'
import NUploadFile from './UploadFile'
import NUploadTrigger from './UploadTrigger'

export default defineComponent({
  name: 'UploadFileList',
  setup(_, { slots }) {
    const NUpload = inject(uploadInjectionKey, null)
    if (!NUpload) {
      throwError(
        'upload-file-list',
        '`n-upload-file-list` must be placed inside `n-upload`.'
      )
    }

    const {
      abstractRef,
      mergedClsPrefixRef,
      listTypeRef,
      mergedFileListRef,
      fileListClassRef,
      fileListStyleRef,
      cssVarsRef,
      themeClassRef,
      maxReachedRef,
      showTriggerRef,
      imageGroupPropsRef
    } = NUpload

    const isImageCardTypeRef = computed(
      () => listTypeRef.value === 'image-card'
    )

    const renderFileList = (): VNode[] =>
      mergedFileListRef.value.map((file, index) => (
        <NUploadFile
          clsPrefix={mergedClsPrefixRef.value}
          key={file.id}
          file={file}
          index={index}
          listType={listTypeRef.value}
        />
      ))

    const renderUploadFileList = (): VNode =>
      isImageCardTypeRef.value ? (
        <NImageGroup {...imageGroupPropsRef.value}>
          {{ default: renderFileList }}
        </NImageGroup>
      ) : (
        <NFadeInExpandTransition group>
          {{
            default: renderFileList
          }}
        </NFadeInExpandTransition>
      )

    return () => {
      const { value: mergedClsPrefix } = mergedClsPrefixRef
      const { value: abstract } = abstractRef
      return (
        <div
          class={[
            `${mergedClsPrefix}-upload-file-list`,
            isImageCardTypeRef.value
            && `${mergedClsPrefix}-upload-file-list--grid`,
            abstract ? themeClassRef?.value : undefined,
            fileListClassRef.value
          ]}
          style={[
            abstract && cssVarsRef ? cssVarsRef.value : '',
            fileListStyleRef.value as CSSProperties
          ]}
        >
          {renderUploadFileList()}
          {showTriggerRef.value
          && !maxReachedRef.value
          && isImageCardTypeRef.value && (
            <NUploadTrigger>{slots}</NUploadTrigger>
          )}
        </div>
      )
    }
  }
})
