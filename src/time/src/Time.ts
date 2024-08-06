import {
  type PropType,
  computed,
  createTextVNode,
  defineComponent,
  h
} from 'vue'
import { format, formatDistanceStrict, fromUnixTime } from 'date-fns'
import type { Locale } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import { useConfig, useLocale } from '../../_mixins'
import type { ExtractPublicPropTypes } from '../../_utils'
import type { FormatOptions } from './interface'

export const timeProps = {
  time: {
    type: [Number, Date] as PropType<number | Date>,
    default: undefined // For unix or non unix mode, it should be different default value
  },
  type: {
    type: String as PropType<'relative' | 'date' | 'datetime'>,
    default: 'datetime'
  },
  to: {
    type: [Number, Date] as PropType<number | Date>,
    default: undefined // the same as `time` prop
  },
  unix: Boolean,
  format: String,
  text: Boolean,
  timeZone: String,
  formatOptions: {
    type: Object as PropType<FormatOptions>,
    default: undefined
  }
} as const

export type TimeProps = ExtractPublicPropTypes<typeof timeProps>

export default defineComponent({
  name: 'Time',
  props: timeProps,
  setup(props) {
    const now = Date.now()
    const { localeRef, dateLocaleRef } = useLocale('Time')
    const { mergedComponentPropsRef } = useConfig()
    const mergedFormatRef = computed(() => {
      const { timeZone } = props
      if (timeZone) {
        return (
          time: number | Date,
          _format: string,
          options: { locale: Locale } & FormatOptions
        ) => {
          return formatInTimeZone(time, timeZone, _format, options)
        }
      }
      return format
    })
    const dateFnsOptionsRef = computed(() => {
      return {
        locale: dateLocaleRef.value.locale
      }
    })
    const formatOptionsRef = computed(() => {
      const { formatOptions } = props
      const options
        = formatOptions
        ?? mergedComponentPropsRef?.value?.Time?.formatOptions
        ?? {}
      return {
        ...options,
        ...dateFnsOptionsRef.value
      }
    })
    const mergedTimeRef = computed(() => {
      const { time } = props
      if (props.unix) {
        if (time === undefined)
          return now
        return fromUnixTime(typeof time === 'number' ? time : time.valueOf())
      }
      return time ?? now
    })
    const mergedToRef = computed(() => {
      const { to } = props
      if (props.unix) {
        if (to === undefined)
          return now
        return fromUnixTime(typeof to === 'number' ? to : to.valueOf())
      }
      return to ?? now
    })
    const renderedTimeRef = computed(() => {
      if (props.format) {
        return mergedFormatRef.value(
          mergedTimeRef.value,
          props.format,
          formatOptionsRef.value
        )
      }
      else if (props.type === 'date') {
        return mergedFormatRef.value(
          mergedTimeRef.value,
          localeRef.value.dateFormat,
          dateFnsOptionsRef.value
        )
      }
      else if (props.type === 'datetime') {
        return mergedFormatRef.value(
          mergedTimeRef.value,
          localeRef.value.dateTimeFormat,
          dateFnsOptionsRef.value
        )
      }
      else {
        return formatDistanceStrict(mergedTimeRef.value, mergedToRef.value, {
          addSuffix: true,
          locale: dateLocaleRef.value.locale
        })
      }
    })
    return {
      renderedTime: renderedTimeRef
    }
  },
  render() {
    return this.text
      ? createTextVNode(this.renderedTime)
      : h('time', [this.renderedTime])
  }
})
