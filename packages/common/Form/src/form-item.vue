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
      if (lW) {
        s.width = this.labelWidth + 'px'
      } else {
        s.width = 'auto'
      }
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
  methods: {
    getValue (key) {
      return this[key] || this.form[key] || null
    },
    getFormClass () {
      let cls = []
      cls.push('n-form-item__label--' + this.getValue('labelPosition'))
      return cls
    },
    getRules () {
      let rules = []
      if (this.required) {
        rules.push(this.requiredRule)
      }
      if (this.form && this.form.rules && this.prop) {
        rules.push(this.form.rules[this.prop])
      }
      return rules
    },
    onFormBlur (value) {
      this.validate('blur', value)
    },
    onFormChange (value) {
      this.validate('change', value)
    },
    validate (trigger, value, isAll = false) {
      let rules = this.getRules()
      let prop = this.prop
      let activeRule = isAll ? rules : rules.filter(i => {
        return i.trigger = trigger
      })
      if (activeRule.length === 0) return
      const asyncValidator = new AsyncValidator({prop: activeRule})
      asyncValidator.validate({prop: value}, (errors, fields) => {
        if (errors) {
          this.validateInfo = errors[0].message
          this.validateFlag = true
        } else {
          this.clearValidateClass()
        }
      })
      return this.validateFlag
    },
    clearValidateClass () {
      this.validateInfo = ''
      this.validateFlag = false 
    },
    validateEventListener () {
      const rules = this.getRules()
      if (rules.length >= 0) {
        this.$on('on-form-blur', this.onFormBlur)
        this.$on('on-form-change', this.onFormBlur)
      }
    }
  }
}
</script>
