<template>
  <div
    class="n-form-item"
    :class="{
      [`n-form-item--${synthesizedLabelPlacement}-labelled`]: synthesizedLabelPlacement,
      [`n-form-item--${synthesizedLabelAlign}-label-aligned`]: synthesizedLabelAlign,
      [`n-form-item--required`]: synthesizedRequired && showRequireMark,
      [`n-form-item--no-label`]: !(label || $slots.label),
      [`n-form-item--has-feedback`]: hasFeedback,
      [`n-${synthesizedTheme}-theme`]: synthesizedTheme
    }"
  >
    <label
      v-if="label || $slots.label"
      :class="`n-form-item-label`"
      :style="synthesizedLabelStyle"
    >
      <template v-if="$slots.label"><slot name="label" /></template>
      <template v-else>{{ label }}</template>
    </label>
    <div class="n-form-item-control">
      <div
        class="n-form-item-blank"
        :class="validated ? `n-form-item-blank--error` : `n-form-item-blank--pass`"
      >
        <slot />
      </div>
      <div v-if="path" class="n-form-item-feedback-wrapper">
        <transition
          name="n-fade-down"
          @before-enter="handleBeforeEnter"
          @after-leave="handleAfterLeave"
        >
          <div
            v-if="explains.length"
            class="n-form-item-feedback"
          >
            <span
              v-for="(explain, i) in explains"
              :key="i"
            >{{ explain }}<br v-if="i + 1 !== explains.length"></span>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import Schema from 'async-validator'
import get from 'lodash/get'
import registerable from '../../../mixins/registerable'
import withapp from '../../../mixins/withapp'
import themeable from '../../../mixins/themeable'

export default {
  name: 'NFormItem',
  mixins: [
    registerable('NForm', 'items', 'path'),
    withapp,
    themeable
  ],
  props: {
    label: {
      type: String,
      default: null
    },
    labelWidth: {
      type: Number,
      default: null
    },
    labelStyle: {
      type: String,
      default: null
    },
    labelAlign: {
      type: String,
      default: null
    },
    labelPlacement: {
      type: String,
      default: null
    },
    path: {
      type: String,
      default: null
    },
    first: {
      type: Boolean,
      default: false
    },
    rulePath: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    showRequireMark: {
      type: Boolean,
      default: true
    },
    rule: {
      type: [Object, Array],
      default: null
    }
  },
  inject: ['NForm'],
  provide () {
    return {
      NFormItem: this
    }
  },
  data () {
    return {
      explains: [],
      validated: false,
      hasFeedback: false
    }
  },
  computed: {
    labelWidthStyle () {
      if (/\d$/.test(String(this.synthesizedLabelWidth))) {
        return {
          width: `${this.synthesizedLabelWidth}px`
        }
      } else {
        return {
          width: this.synthesizedLabelWidth
        }
      }
    },
    synthesizedLabelStyle () {
      return {
        ...this.labelWidthStyle,
        ...this.labelStyle
      }
    },
    synthesizedLabelWidth () {
      if (this.labelWidth) return this.labelWidth
      if (this.NForm && this.NForm.labelWidth) return this.NForm.labelWidth
      return null
    },
    styleLabelWidth () {
      if (this.synthesizedLabelPlacement === 'top') return null
      if (this.synthesizedLabelWidth === null) return null
      return `${this.synthesizedLabelWidth}px`
    },
    synthesizedRulePath () {
      if (this.rulePath) return this.rulePath
      else if (this.path) {
        return this.path
      } else return null
    },
    synthesizedLabelPlacement () {
      if (this.labelPlacement) return this.labelPlacement
      if (this.NForm && this.NForm.labelPlacement) return this.NForm.labelPlacement
      return 'top'
    },
    synthesizedLabelAlign () {
      if (this.labelAlign) return this.labelAlign
      if (this.NForm && this.NForm.labelAlign) return this.NForm.labelAlign
      return 'left'
    },
    synthesizedRequired () {
      if (this.synthesizedRules.some(rule => rule.required)) return true
      if (this.required) return true
      if (this.NForm && this.NForm.required) return true
      return false
    },
    synthesizedRules () {
      let rules = []
      if (this.rule) {
        if (Array.isArray(this.rule)) {
          rules = rules.concat(this.rule)
        } else {
          rules.push(this.rule)
        }
      }
      if (this.NForm && this.NForm.rules && get(this.NForm.rules, this.synthesizedRulePath, null)) {
        const rule = get(this.NForm.rules, this.path)
        if (Array.isArray(rule)) {
          rules = rules.concat(rule)
        } else {
          rules.push(rule)
        }
      }
      return rules
    }
  },
  created () {
    /**
     * This is buggy!
     * Because if it's child change, rules is not updated
     * However I need to make it work first
     */
    this.addValidationEventListeners()
  },
  methods: {
    handleContentBlur () {
      this.validate('blur')
    },
    handleContentChange () {
      this.validate('change')
    },
    handleContentFocus () {
      this.validate('focus')
    },
    handleContentInput () {
      this.validate('input')
    },
    validate (trigger = null, options = null) {
      if (!this.path) {
        return
      }
      if (!options) {
        options = {}
        options.first = this.first
        options.supressWarning = this.supressWarning
      }
      const rules = this.synthesizedRules
      const path = this.path
      const value = get(this.NForm.model, this.path, null)
      const activeRules = !trigger ? rules : rules.filter(rule => {
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.includes(trigger)
        } else {
          return rule.trigger === trigger
        }
      })
      if (!activeRules.length) return
      const validator = new Schema({ [path]: activeRules })
      // console.log(trigger, { [path]: value })
      validator.validate({ [path]: value }, options, (errors, fields) => {
        // console.log('validate', errors, fields)
        // debugger
        if (errors && errors.length) {
          this.explains = errors.map(error => error.message)
          this.validated = true
        } else {
          this.cleanValidationEffect()
        }
        // callback((errors && errors[0].message) || false, fields)
      })
    },
    cleanValidationEffect () {
      this.explains = []
      this.validated = false
    },
    addValidationEventListeners () {
      const rules = this.synthesizedRules
      if (rules.length >= 0) {
        this.$on('blur', this.handleContentBlur)
        this.$on('input', this.handleContentInput)
        this.$on('focus', this.handleContentFocus)
        this.$on('change', this.handleContentChange)
      }
    },
    handleBeforeEnter () {
      this.hasFeedback = true
    },
    handleAfterLeave () {
      this.hasFeedback = false
    }
  }
}
</script>
