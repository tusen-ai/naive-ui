import type { PropType } from 'vue'
import type { BaseLoadingExposedProps } from '../../_internal'
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
    spinProps: { type: Object as PropType<BaseLoadingExposedProps> }
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
