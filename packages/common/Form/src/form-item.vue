<template>
  <div class="n-form-item" :class="getFormClass()">
    <label v-if="label !== undefined"  :class="`${prefix}__label`" :style="style">{{label}}</label>
    <div class="n-form-item__content" :class="
      validateFlag ? `${prefix}__content--error` : `${prefix}__content--pass`">
      <slot></slot>
      <div :class="`${prefix}__validate`">
        {{validateInfo}}
      </div>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator'
import { debuglog } from 'util';

export default {
  name: 'NFormItem',
  props: {
    label: String,
    labelWidth: Number,
    labelStyle: String,
    labelPosition: String,
    prop: String,
    required: Boolean
  },
  inject: ['form'],
  provide () {
    return {
      formItem: this
    }
  },
  data () {
    return {
      prefix: 'n-form-item',
      validateInfo: '',
      validateFlag: false
    }
  },
  computed: {
    style () {
      let s = {
        width: null,
      }
      let lW = this.getValue('labelWidth')
      s.width = lW ? lW + 'px' : 'auto'
      return s
    },
    requiredRule () {
      let rule = []
      if (this.required) {
        rule.push({
          trigger: 'blur',
          required: true
        })
      }
      return rule
    }
  },
  created () {
    this.validateEventListener()
  },
  beforeDestroy () {
    this.$off('on-form-blur', this.onFormBlur)
    this.$off('on-form-change', this.onFormChange)
  },
  methods: {
    getValue (key) {
      return this[key] || this.form[key] || null
    },
    getFormClass () {
      let cls = []
      let pre = 'n-form-item__label--'
      cls.push(pre + this.getValue('labelPosition'))
      if (this.required) {
        cls.push(pre + 'require')
      } else if (this.form && this.form.rules && this.prop) {
        let flag = (this.form.rules[this.prop] || []).some(i => {
          return i.required
        })
        if (flag) {
          cls.push(pre + 'require')
        }
      }
      return cls
    },
    getPropValue (obj, keys) {
      return keys.reduce((res, n) => (res !== undefined && res[n] !== undefined ? res[n] : null), obj)
    },
    getRules () {
      let rules = []
      if (this.required) {
        rules.push(this.requiredRule)
      }
      if (this.form && this.form.rules && this.prop) {
        (this.form.rules[this.prop] || []).forEach(i => {
          rules.push(i)
        })
      }
      return rules
    },
    onFormBlur () {
      this.validate('blur')
    },
    onFormChange () {
      this.validate('change')
    },
    /**
     * form item validation, can specify rules
     */
    validate (trigger = '', cb = () => {}) {
      if (!this.prop || typeof this.prop !== 'string') {
        return
      }
      let rules = this.getRules()
      // 针对多层对象的验证
      let prop = this.prop
      let value = this.getPropValue(this.form.model, this.prop.split('.'))
      if (this.prop.indexOf('.') > -1) {
        prop = prop.slice(prop.lastIndexOf('.') + 1)
      }
      let activeRule = trigger === '' ? rules : rules.filter(i => {
        return i.trigger === trigger
      })
      if (activeRule.length === 0) return
      const asyncValidator = new AsyncValidator({[prop]: activeRule})
      asyncValidator.validate({[prop]: value}, (errors, fields) => {
        if (errors) {
          this.validateInfo = errors[0].message
          this.validateFlag = true
        } else {
          this.clearValidateClass()
        }
        cb(errors[0].message || false, fields)
        // 此处是否需要向外面发送
      })
    },
    clearValidateClass () {
      this.validateInfo = ''
      this.validateFlag = false 
    },
    validateEventListener () {
      const rules = this.getRules()
      if (rules.length >= 0) {
        this.$on('on-form-blur', this.onFormBlur)
        this.$on('on-form-change', this.onFormChange)
      }
    }
  }
}
</script>
