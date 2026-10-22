import { useIsMounted } from 'vooks'
import { defineComponent, h, Transition } from 'vue'

export default defineComponent({
  name: 'BaseIconSwitchTransition',
  setup(_, { slots }) {
    const isMountedRef = useIsMounted()
    return () => (
      <Transition name="icon-switch-transition" appear={isMountedRef.value}>
        {slots}
      </Transition>
    )
  }
})
