import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'
import fromUnixTime from 'date-fns/fromUnixTime'

export default {
  name: 'NTime',
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
        return format(this.synthesizedTime, this.format)
      } else if (this.type === 'date') {
        return format(this.synthesizedTime, 'yyyy-MM-dd')
      } else if (this.type === 'datetime') {
        return format(this.synthesizedTime, 'yyyy-MM-dd hh:mm:ss')
      } else {
        return formatDistance(this.synthesizedTime, this.synthesizedTo, {
          addSuffix: true
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
