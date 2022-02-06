import { h, defineComponent, ref, onBeforeUnmount, nextTick, toRef } from 'vue'
import { useStyle } from '../../../_mixins'
import style from './styles/index.cssr'

export interface BaseWaveRef {
  play: () => void
}

export default defineComponent({
  name: 'BaseWave',
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup (props) {
    useStyle('-base-wave', style, toRef(props, 'clsPrefix'))
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
          void selfRef.value?.offsetHeight
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
    const { clsPrefix } = this
    return (
      <div
        ref="selfRef"
        aria-hidden
        class={[
          `${clsPrefix}-base-wave`,
          this.active && `${clsPrefix}-base-wave--active`
        ]}
      />
    )
  }
})
