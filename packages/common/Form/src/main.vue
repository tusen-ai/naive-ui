<template>
  <form
    class="n-form"
    :class="{
      'n-form--inline': inline
    }"
  >
    <slot />
  </form>
</template>
<script>
import { deepClone, getObjValue } from '../../../utils/index'
import { debuglog } from 'util';

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
      default: 80
    },
    labelPosition: {
      type: String,
      default: 'right' // ['top', 'right', 'left', 'center']
    },
    model: {
      type: Object,
      default: function () {
        return {}
      }
    },
    rules: {
      type: Object,
      default: function () {
        return {}
      }
    },
    requiredLogo: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      initialValue: ''
    }
  },
  created () {
    this.initialValue = deepClone(this.model)
  },
  methods: {
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
    /**
     * just can reset the value with prop in form-item
     */
    resetForm (target = this) {
      for (let i = 0; i < target.$children.length; i++) {
        let child = target.$children[i]
        if (child.$options.name === 'NFormItem' && child.prop) {
          let keys = child.prop.split('.')
          let obj = this.model
          let j = 0
          keys.forEach((m, n) => {
            if (n !== keys.length - 1) {
              obj = obj[m]
            }
            j = n
          })
          obj[keys[j]] = getObjValue(this.initialValue, keys)
          if (child.validateFlag) {
            child.clearValidateClass()
          }
        } else if (child.$options.name === 'NForm') {
          break
        } else {
          this.resetForm(child)
        }
      }
    }
  }
}
</script>
