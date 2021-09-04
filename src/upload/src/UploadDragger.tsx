import { h, defineComponent, inject } from 'vue'
import { throwError } from '../../_utils'
import { uploadInjectionKey } from './interface'

export const uploadDraggerKey = '__UPLOAD_DRAGGER__'

export default defineComponent({
  name: 'UploadDragger',
  props: {
    internalAsImageCard: Boolean
  },
  [uploadDraggerKey]: true,
  setup (props, { slots }) {
    const NUpload = inject(uploadInjectionKey, null)
    if (!NUpload) {
      throwError(
        'upload-dragger',
        '`n-upload-dragger` must be placed inside `n-upload`.'
      )
    }
    return () => (
      <div
        class={[
          `${NUpload.mergedClsPrefixRef.value}-upload-dragger`,
          props.internalAsImageCard &&
            `${NUpload.mergedClsPrefixRef.value}-upload-dragger--image-card`
        ]}
      >
        {slots}
      </div>
    )
  }
})
