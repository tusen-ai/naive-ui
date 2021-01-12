import { h, createTextVNode } from 'vue'
import { format, formatDistance, fromUnixTime } from 'date-fns'
import { useLocale } from '../../_mixins'

export default {
  name: 'Time',
  props: {
    time: {
      type: [Number, Date],
      default: undefined
    },
    type: {
      validator (value) {
        return ['relative', 'date', 'datetime'].includes(value)
      },
      default: 'relative'
    },
    to: {
      type: [Number, Date],
      default: () => new Date()
    },
    unix: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: undefined
    },
    text: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    return useLocale('Time')
  },
  computed: {
    dateFnsOptions () {
      console.log('dateFnsOptions time', this.dateLocale)
      return {
        locale: this.dateLocale.locale
      }
    },
    mergedTime () {
      if (this.unix) {
        return fromUnixTime(this.time)
      }
      return this.time
    },
    mergedTo () {
      if (this.unix) {
        return fromUnixTime(this.to)
      }
      return this.to
    },
    renderedTime () {
      if (this.format) {
        return format(this.mergedTime, this.format, this.dateFnsOptions)
      } else if (this.type === 'date') {
        return format(this.mergedTime, 'yyyy-MM-dd', this.dateFnsOptions)
      } else if (this.type === 'datetime') {
        return format(
          this.mergedTime,
          'yyyy-MM-dd hh:mm:ss',
          this.dateFnsOptions
        )
      } else {
        return formatDistance(this.mergedTime, this.mergedTo, {
          addSuffix: true,
          locale: this.dateLocale.locale
        })
      }
    }
  },
  render () {
    return this.text
      ? createTextVNode(this.renderedTime)
      : h('time', [this.renderedTime])
  }
}
