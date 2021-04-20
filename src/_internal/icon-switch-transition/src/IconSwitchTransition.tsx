import { h, Transition, defineComponent } from 'vue'
import { useIsMounted } from 'vooks'

export default defineComponent({
  name: 'BaseIconSwitchTransition',
  setup (_, { slots }) {
    const isMountedRef = useIsMounted()
    return () => (
      <Transition name="icon-switch-transition" appear={isMountedRef.value}>
        {slots}
      </Transition>
    )
  }
})
