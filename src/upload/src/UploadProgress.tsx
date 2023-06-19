import { h, defineComponent, inject, type PropType } from 'vue'
import { NFadeInExpandTransition } from '../../_internal'
import { NProgress } from '../../progress'
import { uploadInjectionKey } from './interface'

export default defineComponent({
  name: 'UploadProgress',
  props: {
    show: Boolean,
    percentage: {
      type: Number,
      required: true
    },
    status: {
      type: String as PropType<'info' | 'error' | 'success'>,
      required: true
    }
  },
  setup () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const NUpload = inject(uploadInjectionKey)!
    return {
      mergedTheme: NUpload.mergedThemeRef
    }
  },
  render () {
    return (
      <NFadeInExpandTransition>
        {{
          default: () =>
            this.show ? (
              <NProgress
                type="line"
                showIndicator={false}
                percentage={this.percentage}
                status={this.status}
                height={2}
                theme={this.mergedTheme.peers.Progress}
                themeOverrides={this.mergedTheme.peerOverrides.Progress}
              />
            ) : null
        }}
      </NFadeInExpandTransition>
    )
  }
})
