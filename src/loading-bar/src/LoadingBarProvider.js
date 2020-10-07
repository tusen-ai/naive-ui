import { Fragment, h, ref } from 'vue'
import { useIsMounted } from '../../_utils/composition'
import { Teleport } from '../../_base'
import NLoadingBar from './LoadingBar.vue'

export default {
  name: 'LoadingBarProvider',
  provide () {
    return {
      loadingBar: {
        start: this.start,
        finish: this.finish,
        error: this.error,
        update: this.update
      }
    }
  },
  props: {
    to: {
      type: [String, Object],
      default: undefined
    }
  },
  setup () {
    return {
      isMounted: useIsMounted(),
      loadingBarRef: ref(null)
    }
  },
  methods: {
    start () {
      if (this.isMounted) {
        this.loadingBarRef.start()
      } else {
        this.$nextTick(() => {
          this.loadingBarRef.start()
        })
      }
    },
    error () {
      if (this.isMounted) {
        this.loadingBarRef.error()
      } else {
        this.$nextTick(() => {
          this.loadingBarRef.error()
        })
      }
    },
    finish () {
      if (this.isMounted) {
        this.loadingBarRef.finish()
      } else {
        this.$nextTick(() => {
          this.loadingBarRef.finish()
        })
      }
    },
    update (options) {
      const { percent } = options
      if (this.isMounted) {
        this.loadingBarRef.update(percent)
      } else {
        this.$nextTick(() => {
          this.loadingBarRef.update(percent)
        })
      }
    }
  },
  render () {
    return h(Fragment, null, [
      h(Teleport, {
        to: this.to
      }, {
        default: () => h(NLoadingBar, {
          ref: 'loadingBarRef'
        })
      }),
      this.$slots.default()
    ])
  }
}
