import { Fragment, Teleport, h } from 'vue'
import { useIsMounted } from '../../_utils/composition'
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
      default: 'body'
    }
  },
  setup () {
    return {
      isMounted: useIsMounted()
    }
  },
  methods: {
    start () {
      if (this.isMounted) {
        this.$refs.loadingBar.start()
      } else {
        this.$nextTick(() => {
          this.$refs.loadingBar.start()
        })
      }
    },
    error () {
      if (this.isMounted) {
        this.$refs.loadingBar.error()
      } else {
        this.$nextTick(() => {
          this.$refs.loadingBar.error()
        })
      }
    },
    finish () {
      if (this.isMounted) {
        this.$refs.loadingBar.finish()
      } else {
        this.$nextTick(() => {
          this.$refs.loadingBar.finish()
        })
      }
    },
    update (options) {
      const { percent } = options
      if (this.isMounted) {
        this.$refs.loadingBar.update(percent)
      } else {
        this.$nextTick(() => {
          this.$refs.loadingBar.update(percent)
        })
      }
    }
  },
  render () {
    return h(Fragment, null, [
      h(Teleport, {
        to: this.to
      }, [
        h(NLoadingBar, {
          ref: 'loadingBar'
        })
      ]),
      this.$slots.default()
    ])
  }
}
