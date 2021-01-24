import { h, inject, defineComponent, onBeforeUnmount } from 'vue'
import { UploadInjection } from './interface'

export default defineComponent({
  name: 'UploadDragger',
  setup () {
    const NUpload = inject<UploadInjection>('NUpload')
    NUpload && (NUpload.draggerInside = true)
    onBeforeUnmount(() => {
      NUpload && (NUpload.draggerInside = false)
    })
  },
  render () {
    return <div class="n-upload-dragger">{this.$slots}</div>
  }
})
