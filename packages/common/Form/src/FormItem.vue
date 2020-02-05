<template>
  <div
    class="n-form-item"
    :class="{
      [`n-form-item--${synthesizedLabelPlacement}-labelled`]: synthesizedLabelPlacement,
      [`n-form-item--${synthesizedLabelAlign}-label-aligned`]: synthesizedLabelAlign,
      [`n-form-item--required`]: synthesizedRequired && synthesizedShowRequireMark,
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
      <template
        v-if="$slots.label"
      ><slot
        name="label"
      /></template>
      <template v-else>{{ label }}</template>
    </label>
    <div class="n-form-item-control">
      <div
        class="n-form-item-blank"
        :class="
          validated ? `n-form-item-blank--error` : `n-form-item-blank--pass`
        "
      >
        <slot />
      </div>
      <div v-if="path" class="n-form-item-feedback-wrapper">
        <transition
          name="n-fade-down"
          @before-enter="handleBeforeEnter"
          @before-leave="handleBeforeLeave"
          @after-leave="handleAfterLeave"
        >
          <div v-if="explains.length" class="n-form-item-feedback">
            <span
              v-for="(explain, i) in explains"
              :key="i"
            >{{ explain }}<br
              v-if="i + 1 !== explains.length"
            ></span>
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
  mixins: [registerable('NForm', 'items', 'path'), withapp, themeable],
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
      type: Object,
      default: () => {}
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
      default: null
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
      hasFeedback: false,
      feedbackTransitionBlocked: true
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
    synthesizedShowRequireMark () {
      if (this.showRequireMark === null) {
        return this.NForm.showRequireMark
      }
      return this.showRequireMark
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
      if (this.NForm && this.NForm.labelPlacement) { return this.NForm.labelPlacement }
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
      if (
        this.NForm &&
        this.NForm.rules &&
        get(this.NForm.rules, this.synthesizedRulePath, null)
      ) {
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
  watch: {
    path () {
      this._initData()
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
    _initData () {
      this.explains = []
      this.validated = false
      this.hasFeedback = false
      this.blockFeedbackTransition(this.$refs.feedback)
    },
    handleBeforeLeave (feedback) {
      if (this.feedbackTransitionBlocked) {
        if (feedback) {
          feedback.style.transition = 'none'
        }
      } else {
        if (feedback) {
          feedback.style.transition = null
        }
      }
    },
    blockFeedbackTransition () {
      this.feedbackTransitionBlocked = true
    },
    handleContentBlur () {
      this._validate('blur')
    },
    handleContentChange () {
      this._validate('change')
    },
    handleContentFocus () {
      this._validate('focus')
    },
    handleContentInput () {
      this._validate('input')
    },
    validate (trigger, afterValidate, options) {
      return new Promise((resolve, reject) => {
        this._validate(trigger, options).then(({ valid, errors }) => {
          if (valid) {
            if (afterValidate) {
              afterValidate()
            }
            resolve()
          } else {
            if (afterValidate) {
              afterValidate(errors)
            }
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(errors)
          }
        })
      })
    },
    _validate (
      trigger = null,
      options = {
        suppressWarning: true
      }
    ) {
      if (!this.path) {
        console.warn(
          '[naive-ui/form-item/validate]: validate form-item without path'
        )
        return
      }
      if (!options) {
        options = {}
      } else {
        if (!options.first) options.first = this.first
      }
      const rules = this.synthesizedRules
      const path = this.path
      const value = get(this.NForm.model, this.path, null)
      const activeRules = (!trigger
        ? rules
        : rules.filter(rule => {
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger)
          } else {
            return rule.trigger === trigger
          }
        })
      ).map(rule => {
        const originValidator = rule.validator
        if (typeof originValidator === 'function') {
          rule.validator = (...args) => {
            const validateResult = originValidator(...args)
            if (validateResult instanceof Error) {
              return validateResult
            }
            return !!validateResult
          }
        }
        return rule
      })
      if (!activeRules.length) {
        return Promise.resolve({
          valid: true
        })
      }
      const validator = new Schema({ [path]: activeRules })
      return new Promise((resolve, reject) => {
        validator.validate({ [path]: value }, options, (errors, fields) => {
          if (errors && errors.length) {
            this.explains = errors.map(error => error.message)
            resolve({
              valid: false,
              errors
            })
          } else {
            this.clearValidationEffect()
            resolve({
              valid: true
            })
          }
        })
      })
    },
    clearValidationEffect () {
      this.explains = []
      this.validated = false
    },
    addValidationEventListeners () {
      const rules = this.synthesizedRules
      if (rules.length > 0) {
        this.$on('blur', this.handleContentBlur)
        this.$on('input', this.handleContentInput)
        this.$on('focus', this.handleContentFocus)
        this.$on('change', this.handleContentChange)
      }
    },
    handleBeforeEnter () {
      this.feedbackTransitionBlocked = false
      this.hasFeedback = true
    },
    handleAfterLeave () {
      this.hasFeedback = false
      this.feedbackTransitionBlocked = false
    }
  }
}
</script>
