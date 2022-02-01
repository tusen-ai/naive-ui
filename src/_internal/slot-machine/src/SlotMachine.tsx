import {
  h,
  defineComponent,
  TransitionGroup,
  computed,
  ref,
  watch,
  toRef
} from 'vue'
import NFadeInExpandTransition from '../../fade-in-expand-transition'
import { useStyle } from '../../../_mixins'
import SlotMachineNumber from './SlotMachineNumber'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'BaseSlotMachine',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: Number,
      default: undefined
    },
    appeared: {
      type: Boolean,
      required: true
    }
  },
  setup (props) {
    useStyle('-base-slot-machine', style, toRef(props, 'clsPrefix'))
    const oldValueRef = ref<number>()
    const newValueRef = ref<number>()
    const numbersRef = computed(() => {
      if (typeof props.value === 'string') return []
      if (props.value < 1) return [0]
      const numbers: number[] = []
      let value = props.value
      if (props.max !== undefined) {
        value = Math.min(props.max, value)
      }
      while (value >= 1) {
        numbers.push(value % 10)
        value /= 10
        value = Math.floor(value)
      }
      numbers.reverse()
      return numbers
    })
    watch(toRef(props, 'value'), (value, oldValue) => {
      if (typeof value === 'string') {
        newValueRef.value = undefined
        oldValueRef.value = undefined
      } else {
        if (typeof oldValue === 'string') {
          newValueRef.value = value
          oldValueRef.value = undefined
        } else {
          newValueRef.value = value
          oldValueRef.value = oldValue
        }
      }
    })
    return () => {
      const { value, clsPrefix } = props
      return typeof value === 'number' ? (
        <span class={`${clsPrefix}-base-slot-machine`}>
          <TransitionGroup name="fade-up-width-expand-transition" tag="span">
            {{
              default: () =>
                numbersRef.value.map((number, i) => (
                  <SlotMachineNumber
                    clsPrefix={clsPrefix}
                    key={numbersRef.value.length - i - 1}
                    oldOriginalNumber={oldValueRef.value}
                    newOriginalNumber={newValueRef.value}
                    value={number}
                  />
                ))
            }}
          </TransitionGroup>
          <NFadeInExpandTransition key="+" width>
            {{
              default: () =>
                props.max !== undefined && props.max < value ? (
                  <SlotMachineNumber clsPrefix={clsPrefix} value="+" />
                ) : null
            }}
          </NFadeInExpandTransition>
        </span>
      ) : (
        <span class={`${clsPrefix}-base-slot-machine`}>{value}</span>
      )
    }
  }
})
