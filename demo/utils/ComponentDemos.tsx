import { defineComponent, Fragment, h, computed } from 'vue'
import { useIsM } from './composables'

export default defineComponent({
  name: 'ComponentDemos',
  props: {
    span: {
      type: Number,
      default: 2
    }
  },
  setup (props) {
    const isMRef = useIsM()
    const mergedColsRef = computed(() => {
      return isMRef.value ? 1 : props.span
    })
    return {
      mergedCols: mergedColsRef
    }
  },
  render () {
    const children = this.$slots.default?.() ?? []
    const { mergedCols } = this
    return (
      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns:
            mergedCols === 1 ? '100%' : 'minmax(0, 1fr) minmax(0, 1fr)',
          alignItems: 'flex-start'
        }}
      >
        {mergedCols === 1 ? (
          children
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gap: '16px',
                gridTemplateColumns: '100%'
              }}
            >
              {children.filter((_, index) => index % 2 === 0)}
            </div>
            <div
              style={{
                display: 'grid',
                gap: '16px',
                gridTemplateColumns: '100%'
              }}
            >
              {children.filter((_, index) => index % 2 === 1)}
            </div>
          </>
        )}
      </div>
    )
  }
})
