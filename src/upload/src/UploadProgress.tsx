import { h, defineComponent, inject, PropType } from 'vue'
import { NFadeInExpandTransition } from '../../_internal'
import { NProgress } from '../../progress'
import { uploadInjectionKey } from './interface'

export default defineComponent({
  name: 'UploadProgress',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    percentage: {
      type: Number,
      required: true
    },
    status: {
      type: String as PropType<'info' | 'error' | 'success'>,
      required: true
    },
    delay: {
      type: Number,
      default: 900
    }
  },
  setup (props) {
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
