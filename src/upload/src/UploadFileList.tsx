import { h, defineComponent, inject, VNode, CSSProperties } from 'vue'
import { throwError } from '../../_utils'
import { uploadInjectionKey } from './interface'
import NUploadFile from './UploadFile'
import { NImageGroup } from '../../image'
import { NFadeInExpandTransition } from '../../_internal'
import NUploadTrigger from './UploadTrigger'
export default defineComponent({
  name: 'UploadFileList',
  setup (_, { slots }) {
    const NUpload = inject(uploadInjectionKey, null)
    if (!NUpload) {
      throwError(
        'upload-file-list',
        '`n-upload-file-list` must be placed inside `n-upload`.'
      )
    }

    const {
      mergedClsPrefixRef,
      listTypeRef,
      mergedFileListRef,
      fileListStyle,
      cssVarsRef
    } = NUpload
    const isImageCardType = listTypeRef.value === 'image-card'

    const createFileList = (): VNode[] =>
      mergedFileListRef.value.map((file) => (
        <NUploadFile
          clsPrefix={mergedClsPrefixRef.value}
          key={file.id}
          file={file}
          listType={listTypeRef.value}
        />
      ))

    const uploadFileList = isImageCardType ? (
      <NImageGroup>{{ default: createFileList }}</NImageGroup>
    ) : (
      <NFadeInExpandTransition group>
        {{
          default: createFileList
        }}
      </NFadeInExpandTransition>
    )

    return () => (
      <div
        class={[
          `${mergedClsPrefixRef.value}-upload-file-list`,
          isImageCardType &&
            `${mergedClsPrefixRef.value}-upload-file-list--grid`
        ]}
        style={[cssVarsRef.value, fileListStyle as CSSProperties]}
      >
        {uploadFileList}
        {isImageCardType && <NUploadTrigger>{slots}</NUploadTrigger>}
      </div>
    )
  }
})
