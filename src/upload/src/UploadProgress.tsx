import { h, defineComponent, inject, PropType } from 'vue'
import { NFadeInExpandTransition } from '../../_internal'
import { NProgress } from '../../progress'
import type { UploadInjection } from './interface'

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
  // data () {
  //   return {
  //     deferredShow: false
  //   }
  // },
  // watch: {
  //   show (value) {
  //     if (value) this.deferredShow = true
  //     else {
  //       window.setTimeout(() => {
  //         this.deferredShow = false
  //       }, this.delay)
  //     }
  //   }
  // },
  // created () {
  //   this.deferredShow = this.show
  // },
  setup (props) {
    const NUpload = inject<UploadInjection>('NUpload') as UploadInjection
    return {
      NUpload
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
                theme={this.NUpload.mergedTheme.peers.Progress}
                themeOverrides={this.NUpload.mergedTheme.peerOverrides.Progress}
              />
            ) : null
        }}
      </NFadeInExpandTransition>
    )
  }
})
