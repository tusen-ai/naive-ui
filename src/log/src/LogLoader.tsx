import type { PropType } from 'vue'
import type { LogSpinProps } from './public-types'
import { defineComponent, h } from 'vue'
import { NBaseLoading } from '../../_internal'
import { useLocale } from '../../_mixins'

export default defineComponent({
  name: 'LogLoader',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    spinProps: Object as PropType<LogSpinProps>
  },
  setup() {
    return {
      locale: useLocale('Log').localeRef
    }
  },
  render() {
    const { clsPrefix } = this
    return (
      <div class={`${clsPrefix}-log-loader`}>
        <NBaseLoading
          clsPrefix={clsPrefix}
          strokeWidth={24}
          scale={0.85}
          {...this.spinProps}
        />
        <span class={`${clsPrefix}-log-loader__content`}>
          {this.locale.loading}
        </span>
      </div>
    )
  }
})
