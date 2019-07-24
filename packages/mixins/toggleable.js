/**
 * Toggle prop active use v-model
 *
 * @prop {boolean} active
 *
 * So if you want to your component to work with itself using this mixin, you
 * need to wrap it.
 * for example:
 * export default {
 *   data () {
 *     return {
 *       active: false
 *     }
 *   },
 *   ...,
 *   methods: {
 *     handleSetActive (active) {
 *       this.active = active
 *     }
 *   },
 *   render (h) {
 *     on = {
 *       handleSetActive: this.setActive.bind(this)
 *     }
 *     return h(MyComponent, {
 *       props: { .
 *         ..this.$props,
 *         active: this.active
 *       },
 *       on
 *     })
 *   }
 * }
 */
export default {
  model: {
    prop: 'active',
    event: 'setactive'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deactivate () {
      // console.log('deactivate')
      this.$emit('setactive', false)
    },
    activate () {
      // console.log('activate')
      this.$emit('setactive', true)
    },
    toggle () {
      if (this.active) this.deactivate()
      else this.activate()
    }
  }
}
