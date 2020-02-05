import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import fromUnixTime from 'date-fns/fromUnixTime'
import zhCN from 'date-fns/locale/zh-CN'
import enUS from 'date-fns/locale/en-US'

import locale from '../../../mixins/locale'

export default {
  name: 'NTime',
  mixins: [
    locale
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
    synthesizedTime () {
      if (this.unix) {
        return fromUnixTime(this.time)
      }
      return this.time
    },
    synthesizedTo () {
      if (this.unix) {
        return fromUnixTime(this.to)
      }
      return this.to
    },
    renderedTime () {
      if (this.format) {
        return format(this.synthesizedTime, this.format, this.dateFnsOptions)
      } else if (this.type === 'date') {
        return format(this.synthesizedTime, 'yyyy-MM-dd', this.dateFnsOptions)
      } else if (this.type === 'datetime') {
        return format(this.synthesizedTime, 'yyyy-MM-dd hh:mm:ss', this.dateFnsOptions)
      } else {
        return formatDistance(this.synthesizedTime, this.synthesizedTo, {
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
