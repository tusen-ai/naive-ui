import FocusDetector from '../../../_base/focus-detector'
import {
  locale
} from '../../../_mixins'
import keyboardDelegate from '../../../_utils/delegate/keyboardDelegate'
import { KEY_CODE } from '../../../_utils'

const TIME_CONST = {
  hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
  minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
  seconds: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default {
  mixins: [ locale('DatePicker') ],
  inject: {
    NDatePicker: {
      default: null
    }
  },
  components: {
    FocusDetector
  },
  props: {
    theme: {
      type: String,
      default: null
    },
    active: {
      type: Boolean,
      default: undefined
    },
    onConfirm: {
      type: Function,
      default: undefined
    },
    'onUpdate:value': {
      type: Function,
      default: undefined
    },
    onClose: {
      type: Function,
      default: undefined
    },
    onTabOut: {
      type: Function,
      default: undefined
    }
  },
  data () {
    return {
      noTransition: false,
      memorizedValue: this.value,
      ...TIME_CONST
    }
  },
  computed: {
    weekdays () {
      return weekdays.map(weekday => this.localeNamespace[weekday])
    }
  },
  methods: {
    doConfirm (...args) {
      const {
        onConfirm
      } = this
      if (onConfirm) onConfirm(...args)
    },
    doUpdateValue (...args) {
      const {
        'onUpdate:value': onUpdateValue
      } = this
      if (onUpdateValue) onUpdateValue(...args)
    },
    doClose (...args) {
      const {
        onClose
      } = this
      if (onClose) onClose(...args)
    },
    doTabOut (...args) {
      const {
        onTabOut
      } = this
      if (onTabOut) onTabOut(...args)
    },
    clearValue () {
      this.doUpdateValue(null)
    },
    handleFocusDetectorFocus (e) {
      this.doTabOut(e)
    },
    disableTransitionOneTick () {
      if (this.active) {
        this.noTransition = true
        this.$nextTick(() => {
          const el = this.$el
          if (el) {
            void el.offsetWidth
          }
          this.noTransition = false
        })
      } else {
        this.noTransition = false
      }
    },
    handlePanelKeyDown (e) {
      if (
        e.keyCode === KEY_CODE.TAB &&
        e.target === this.$el &&
        keyboardDelegate.shiftPressed
      ) {
        e.preventDefault()
        this.doTabOut()
      }
    },
    handlePanelFocus (e) {
      if (
        keyboardDelegate.tabPressed &&
        e.target === this.$el &&
        this.$el.contains(e.relatedTarget)
      ) {
        this.doTabOut()
      }
    }
  }
}
