import { h, createTextVNode, PropType, defineComponent, computed } from 'vue'
import { format, formatDistance, fromUnixTime } from 'date-fns'
import { useLocale } from '../../_mixins'

export default defineComponent({
  name: 'Time',
  props: {
    time: {
      type: [Number, Date] as PropType<number | Date>,
      default: () => Date.now()
    },
    type: {
      type: String as PropType<'relative' | 'date' | 'datetime'>,
      default: 'datetime'
    },
    to: {
      type: [Number, Date] as PropType<number | Date>,
      default: () => Date.now()
    },
    unix: {
      type: Boolean,
      default: false
    },
    format: String,
    text: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { locale, dateLocale } = useLocale('Time')
    const dateFnsOptionsRef = computed(() => {
      return {
        locale: dateLocale.value.locale
      }
    })
    const mergedTimeRef = computed(() => {
      if (props.unix) {
        return fromUnixTime(props.time as number)
      }
      return props.time
    })
    const mergedToRef = computed(() => {
      if (props.unix) {
        return fromUnixTime(props.to as number)
      }
      return props.to
    })
    const renderedTimeRef = computed(() => {
      if (props.format) {
        return format(
          mergedTimeRef.value,
          props.format,
          dateFnsOptionsRef.value
        )
      } else if (props.type === 'date') {
        return format(
          mergedTimeRef.value,
          locale.value.dateFormat,
          dateFnsOptionsRef.value
        )
      } else if (props.type === 'datetime') {
        return format(
          mergedTimeRef.value,
          locale.value.dateTimeFormat,
          dateFnsOptionsRef.value
        )
      } else {
        return formatDistance(mergedTimeRef.value, mergedToRef.value, {
          addSuffix: true,
          locale: dateLocale.value.locale
        })
      }
    })
    return {
      renderedTime: renderedTimeRef
    }
  },
  render () {
    return this.text
      ? createTextVNode(this.renderedTime)
      : h('time', [this.renderedTime])
  }
})
