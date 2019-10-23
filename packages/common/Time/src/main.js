import { format, formatDistance, isValid } from 'date-fns'

export default {
  name: 'NTime',
  props: {
    time: {
      validator (value) {
        return isValid(new Date(value))
      },
      default: null
    },
    type: {
      validator (value) {
        return ['relative', 'date', 'datetime'].includes(value)
      },
      default: 'relative'
    },
    to: {
      validator (value) {
        return isValid(new Date(value))
      },
      default: () => new Date()
    },
    format: {
      type: String,
      default: null
    }
  },
  computed: {
    renderedTime () {
      if (this.format) {
        return format(this.time, this.format)
      } else if (this.type === 'date') {
        return format(this.time, 'yyyy-MM-dd')
      } else if (this.type === 'datetime') {
        return format(this.time, 'yyyy-MM-dd hh:mm:ss')
      } else {
        return formatDistance(this.time, this.to, {
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
    return h('span', this.renderedTime)
  }
}
