import { h, defineComponent, inject } from 'vue'
import { throwError } from '../../_utils'
import { uploadInjectionKey } from './interface'

export const uploadDraggerKey = '__UPLOAD_DRAGGER__'

export default defineComponent({
  name: 'UploadDragger',
  [uploadDraggerKey]: true,
  setup (_, { slots }) {
    const NUpload = inject(uploadInjectionKey, null)
    if (!NUpload) {
      throwError(
        'upload-dragger',
        '`n-upload-dragger` must be placed inside `n-upload`.'
      )
    }
    return () => (
      <div class={`${NUpload.cPrefixRef.value}-upload-dragger`}>{slots}</div>
    )
  }
})
