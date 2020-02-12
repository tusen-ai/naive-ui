import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import fromUnixTime from 'date-fns/fromUnixTime'
import zhCN from 'date-fns/locale/zh-CN'
import enUS from 'date-fns/locale/en-US'

import locale from '../../_mixins/locale'

export default {
  name: 'NTime',
  mixins: [
    locale('Time')
  ],
  props: {
    time: {
      type: [Number, Date],
      default: null
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
      default: null
    },
    transparent: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    dateFnsLocale () {
      return ({
        'zh-CN': zhCN,
        'en-US': enUS
      })[this.locale]
    },
    dateFnsOptions () {
      return {
        locale: this.dateFnsLocale
      }
    },
    syntheticTime () {
      if (this.unix) {
        return fromUnixTime(this.time)
      }
      return this.time
    },
    syntheticTo () {
      if (this.unix) {
        return fromUnixTime(this.to)
      }
      return this.to
    },
    renderedTime () {
      if (this.format) {
        return format(this.syntheticTime, this.format, this.dateFnsOptions)
      } else if (this.type === 'date') {
        return format(this.syntheticTime, 'yyyy-MM-dd', this.dateFnsOptions)
      } else if (this.type === 'datetime') {
        return format(this.syntheticTime, 'yyyy-MM-dd hh:mm:ss', this.dateFnsOptions)
      } else {
        return formatDistance(this.syntheticTime, this.syntheticTo, {
          addSuffix: true,
          locale: this.dateFnsLocale
        })
      }
    }
  },
  data () {
    return {
      msPassedAfterCreated: 0
    }
  },
  render (h) {
    return this.transparent ? this._v(this.renderedTime) : h('time', this.renderedTime)
  }
}
