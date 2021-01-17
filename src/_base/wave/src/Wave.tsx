import { h, defineComponent, ref, onBeforeUnmount, nextTick } from 'vue'
import { useStyle } from '../../../_mixins'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseWave',
  setup () {
    useStyle('BaseWave', style)
    const selfRef = ref<HTMLElement | null>(null)
    const activeRef = ref(false)
    let animationTimerId: number | null = null
    onBeforeUnmount(() => {
      if (animationTimerId !== null) {
        window.clearTimeout(animationTimerId)
      }
    })
    return {
      active: activeRef,
      selfRef,
      play () {
        if (animationTimerId !== null) {
          window.clearTimeout(animationTimerId)
          activeRef.value = false
          animationTimerId = null
        }
        void nextTick(() => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          void selfRef.value!.offsetHeight
          activeRef.value = true
          animationTimerId = window.setTimeout(() => {
            activeRef.value = false
            animationTimerId = null
          }, 1000)
        })
      }
    }
  },
  render () {
    return (
      <div
        ref="selfRef"
        class={[
          'n-base-wave',
          {
            'n-base-wave--active': this.active
          }
        ]}
      />
    )
  }
})
