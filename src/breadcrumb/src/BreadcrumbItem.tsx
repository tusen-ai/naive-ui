import { h, defineComponent, inject } from 'vue'
import { BreadcrumbInjection } from './Breadcrumb'

export default defineComponent({
  name: 'BreadcrumbItem',
  setup (_, { slots }) {
    const NBreadcrumb = inject<BreadcrumbInjection>('NBreadcrumb')
    return () => (
      <span class="n-breadcrumb-item">
        <span class="n-breadcrumb-item__link">{slots}</span>
        <span class="n-breadcrumb-item__separator">
          {NBreadcrumb?.separator}
        </span>
      </span>
    )
  }
})
