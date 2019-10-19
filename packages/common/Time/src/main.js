// import moment from 'moment'

export default {
  name: 'NTime',
  props: {
    time: {
      validator (time) {
        if (time === null) return false
        // return moment(time).isValid()
      },
      default: null
    },
    raw: {
      type: Boolean,
      default: false
    },
    type: {
      validator (type) {
        return ['relative', 'date', 'datetime'].includes('type')
      },
      default: 'relative'
    },
    format: {
      type: String,
      default: null
    }
  },
  computed: {
    renderedTime () {

    }
  },
  data () {
    return {
      msPassedAfterCreated: 0
    }
  },
  render (h) {
    return 'time'
  }
}
