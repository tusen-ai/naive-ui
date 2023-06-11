import {
  defineComponent,
  h,
  nextTick,
  ref,
  computed,
  type PropType,
  watch,
  toRef
} from 'vue'

export default defineComponent({
  name: 'SlotMachineNumber',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    value: {
      // could be '+', 1, 2, ...
      type: [Number, String] as PropType<string | number>,
      required: true
    },
    oldOriginalNumber: {
      type: Number,
      default: undefined
    },
    newOriginalNumber: {
      type: Number,
      default: undefined
    }
  },
  setup (props) {
    const numberRef = ref<HTMLElement | null>(null)
    const oldNumberRef = ref<number | string>(props.value)
    const newNumberRef = ref<number | string>(props.value)
    const scrollAnimationDirectionRef = ref<'up' | 'down'>('up')
    const activeRef = ref(false)
    const newNumberScrollAnimationClassRef = computed(() => {
      return activeRef.value
        ? `${props.clsPrefix}-base-slot-machine-current-number--${scrollAnimationDirectionRef.value}-scroll`
        : null
    })
    const oldNumberScrollAnimationClassRef = computed(() => {
      return activeRef.value
        ? `${props.clsPrefix}-base-slot-machine-old-number--${scrollAnimationDirectionRef.value}-scroll`
        : null
    })
    // BUG: may be typescript bug
    watch(toRef(props, 'value'), (value, oldValue) => {
      oldNumberRef.value = oldValue
      newNumberRef.value = value
      void nextTick(scroll)
    })
    function scroll (): void {
      const newOriginalNumber = props.newOriginalNumber
      const oldOriginalNumber = props.oldOriginalNumber
      if (oldOriginalNumber === undefined || newOriginalNumber === undefined) {
        return
      }
      if (newOriginalNumber > oldOriginalNumber) {
        scrollByDir('up')
      } else if (oldOriginalNumber > newOriginalNumber) {
        scrollByDir('down')
      }
    }
    function scrollByDir (dir: 'up' | 'down'): void {
      scrollAnimationDirectionRef.value = dir
      activeRef.value = false
      void nextTick(() => {
        void numberRef.value?.offsetWidth
        activeRef.value = true
      })
    }
    return () => {
      const { clsPrefix } = props
      return (
        <span ref={numberRef} class={`${clsPrefix}-base-slot-machine-number`}>
          {oldNumberRef.value !== null ? (
            <span
              class={[
                `${clsPrefix}-base-slot-machine-old-number ${clsPrefix}-base-slot-machine-old-number--top`,
                oldNumberScrollAnimationClassRef.value
              ]}
            >
              {oldNumberRef.value}
            </span>
          ) : null}
          <span
            class={[
              `${clsPrefix}-base-slot-machine-current-number`,
              newNumberScrollAnimationClassRef.value
            ]}
          >
            <span
              ref="numberWrapper"
              class={[
                `${clsPrefix}-base-slot-machine-current-number__inner`,
                typeof props.value !== 'number' &&
                  `${clsPrefix}-base-slot-machine-current-number__inner--not-number`
              ]}
            >
              {newNumberRef.value}
            </span>
          </span>
          {oldNumberRef.value !== null ? (
            <span
              class={[
                `${clsPrefix}-base-slot-machine-old-number ${clsPrefix}-base-slot-machine-old-number--bottom`,
                oldNumberScrollAnimationClassRef.value
              ]}
            >
              {oldNumberRef.value}
            </span>
          ) : null}
        </span>
      )
    }
  }
})
