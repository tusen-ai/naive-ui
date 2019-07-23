<template>
  <form 
    class="n-form"
    :class="{
      'n-form--inline': inline,
    }"
  >
    <slot v-bind:form="this"></slot>
  </form>
</template>
<script>
export default {
  name: 'NForm',
  provide () {
    return {
      form: this
    }
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: Number,
      default: 200
    },
    labelPosition: {
      type: String,
      default: 'right' // ['top', 'right', 'left', 'center']
    },
    model: {
      type: Object
    }, 
    disabled: {
      type: Boolean,
      default: null 
    },
    rules: {
      type: Object 
    }
  },
  data () {
    return {
      initialValue: '' 
    }
  },
  watch: {
    disabled: {
      handler (n) {
        this.disabledToggle(n)
      }
    }
  },
  created() {
    this.initialValue = JSON.parse(JSON.stringify(this.model || ''))
  },
  mounted () {
    this.disabledToggle(this.disabled)
  },
  methods: {
    disabledToggle (flag) {
      this.$children.forEach(child => {
        console.log(child.$options.componentName)
      })
      let sel = ['input', 'select', 'textarea'].map(i => '.n-form-item ' + i).join(',')
      let el = this.$el.querySelectorAll(sel)
      el.forEach(i => {
        i.disabled = flag

        if (flag) {
          i.classList.toggle('n-form--disable')
        }
      })
    },
    getLabelPosClass (labelPosition) {
      return 'n-form--lable-' + labelPosition
    },
    /** 
     * form validation, validate all prop-elements by default,
     * can use specify the scope of validation by param part.
     * 
     * @param {Funtion} cb callback
     * @param {Array} scope  to specify the scope of validation
     * @return {Boolean} validation passed or not
     */
    validate (cb, scope = []) {
      let promise
      let isCallback = typeof cb === 'function'
      if (!isCallback && window.Promise) {
        promise = new Promise((resolve, reject) => {
          cb = valid => valid ? resolve(valid) : reject(valid)
        })
      }
      let valid = true
      let fields = {}
      this.$children.forEach((child, i) => {
        let flag = scope.length > 0 ? scope.indexOf(child.prop) > -1 : true
        if (child.prop && flag) {
          child.validate('', (errors, field) => {
            if (errors) {
              valid = false
            }
            fields = Object.assign({}, fields, field)
          })
        }
        if (++i === this.$children.length && isCallback) {
          cb(valid, fields)
        }
      })

      if (promise) {
        return promise
      }
    },
    resetForm () {
      this.$children.forEach(child => {
        if (child.prop) {
          // 这里需要考虑prop是复杂key的情况, 带.
          this.model[child.prop] = this.initialValue[child.prop]
          if (child.validateFlag) {
            child.clearValidateClass()
          }
        }
      })
    }
  }
}
</script>