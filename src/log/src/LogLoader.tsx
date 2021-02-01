import { h, defineComponent } from 'vue'
import { NBaseLoading } from '../../_internal'
import { useLocale } from '../../_mixins'

export default defineComponent({
  name: 'LogLoader',
  setup () {
    return useLocale('Log')
  },
  render () {
    return (
      <div class="n-log-loader">
        <NBaseLoading strokeWidth={24} />
        <span class="n-log-loader__content">{this.locale.loading}</span>
      </div>
    )
  }
})
