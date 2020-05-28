<template>
  <div
    class="n-form-item"
    :class="{
      [`n-form-item--${syntheticSize}-size`]: true,
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      [`n-form-item--${syntheticLabelPlacement}-labelled`]: syntheticLabelPlacement,
      [`n-form-item--${syntheticLabelAlign}-label-aligned`]: syntheticLabelAlign,
      [`n-form-item--required`]: syntheticRequired && syntheticShowRequireMark,
      [`n-form-item--no-label`]: !(label || $scopedSlots.label),
      [`n-form-item--has-feedback`]: hasFeedback
    }"
  >
    <label
      v-if="label || $scopedSlots.label"
      :class="`n-form-item-label`"
      :style="syntheticLabelStyle"
    >
      <template
        v-if="$scopedSlots.label"
      ><slot
        name="label"
      /></template>
      <template v-else>{{ label }}</template>
    </label>
    <div class="n-form-item-control">
      <div
        class="n-form-item-blank"
        :class="{
          [`n-form-item-blank--${syntheticValidationStatus}`]: syntheticValidationStatus
        }"
      >
        <slot />
      </div>
      <div v-if="syntheticValidationStatus !== null || path" class="n-form-item-feedback-wrapper">
        <transition
          name="n-form-item-feedback-transition"
          @before-enter="handleBeforeEnter"
          @before-leave="handleBeforeLeave"
          @after-leave="handleAfterLeave"
        >
          <div v-if="feedback !== null" class="n-form-item-feedback">
            {{ feedback }}
          </div>
          <div v-else-if="explains.length" class="n-form-item-feedback">
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
import get from 'lodash-es/get'
import registerable from '../../_mixins/registerable'
import withapp from '../../_mixins/withapp'
import themeable from '../../_mixins/themeable'
import formatLength from '../../_utils/css/formatLength'

function wrapValidator (validator) {
  if (typeof validator === 'function') {
    return (...args) => {
      try {
        const validateResult = validator(...args)
        if (
          typeof validateResult === 'boolean' ||
          validateResult instanceof Error ||
          (validateResult && validateResult.then)
        ) {
          return validateResult
        } else if (validateResult === void 0) {
          return true
        } else {
          console.warn(
            `[naive-ui/form-item/validate]: You return a ${typeof validateResult} ` +
            'typed value in the validator method, which is not recommended. Please ' +
            'use `boolean`, `Error` or `Promise` typed value instead.'
          )
          return true
        }
      } catch (err) {
        console.error(
          '[naive-ui/form-item/validate]: An error is catched in the validation, ' +
          'so the validation won\'t be done. Your callback in `validate` method of ' +
          '`n-form` or `n-form-item` won\'t be called in this validation.'
        )
        console.error(err)
        return void 0
      }
    }
  }
  return validator
}

export default {
  name: 'NFormItem',
  mixins: [registerable('NForm', 'items', 'path'), withapp, themeable],
  props: {
    label: {
      type: [Number, String],
      default: null
    },
    labelWidth: {
      type: [Number, String],
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
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: null
    },
    ignorePathChange: {
      type: Boolean,
      default: false
    },
    validationStatus: {
      validator (value) {
        return ['error', 'warning', 'success'].includes(value)
      },
      default: null
    },
    feedback: {
      type: String,
      default: null
    }
  },
  inject: {
    NForm: {
      default: null
    },
    NFormItem: {
      default: null
    }
  },
  provide () {
    return {
      NFormItem: this
    }
  },
  data () {
    return {
      explains: [],
      validationErrored: false,
      hasFeedback: false,
      feedbackTransitionDisabled: true
    }
  },
  computed: {
    syntheticSize () {
      if (this.size) return this.size
      const NFormItem = this.NFormItem
      if (NFormItem && NFormItem.syntheticSize) return NFormItem.syntheticSize
      const NForm = this.NForm
      if (NForm && NForm.size) {
        return NForm.size
      }
      return null
    },
    syntheticValidationStatus () {
      if (this.validationStatus !== null) return this.validationStatus
      if (this.validationErrored) return 'error'
      return null
    },
    labelWidthStyle () {
      return {
        width: formatLength(this.syntheticLabelWidth)
      }
    },
    syntheticShowRequireMark () {
      if (this.showRequireMark === null) {
        return this.NForm.showRequireMark
      }
      return this.showRequireMark
    },
    syntheticLabelStyle () {
      return {
        ...this.labelWidthStyle,
        ...this.labelStyle
      }
    },
    syntheticLabelWidth () {
      if (this.labelWidth) return this.labelWidth
      if (this.NForm && this.NForm.labelWidth) return this.NForm.labelWidth
      return null
    },
    syntheticRulePath () {
      if (this.rulePath) return this.rulePath
      else if (this.path) {
        return this.path
      } else return null
    },
    syntheticLabelPlacement () {
      if (this.labelPlacement) return this.labelPlacement
      if (this.NForm && this.NForm.labelPlacement) { return this.NForm.labelPlacement }
      return 'top'
    },
    syntheticLabelAlign () {
      if (this.labelAlign) return this.labelAlign
      if (this.NForm && this.NForm.labelAlign) return this.NForm.labelAlign
      return 'left'
    },
    syntheticRequired () {
      if (this.syntheticRules.some(rule => rule.required)) return true
      if (this.required) return true
      if (this.NForm && this.NForm.required) return true
      return false
    },
    syntheticRules () {
      let rules = []
      if (this.rule) {
        if (Array.isArray(this.rule)) {
          rules = rules.concat(this.rule)
        } else {
          rules.push(this.rule)
        }
      }
      const NForm = this.NForm
      if (
        NForm &&
        NForm.rules &&
        get(NForm.rules, this.syntheticRulePath, null)
      ) {
        const rule = get(NForm.rules, this.syntheticRulePath)
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
      if (this.ignorePathChange) return
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
      this.validationErrored = false
      this.hasFeedback = false
      this.disableFeedbackTransition()
    },
    handleBeforeLeave (feedback) {
      if (this.feedbackTransitionDisabled) {
        if (feedback) {
          feedback.style.transition = 'none'
        }
      } else {
        if (feedback) {
          feedback.style.transition = null
        }
      }
    },
    disableFeedbackTransition () {
      this.feedbackTransitionDisabled = true
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
    validate (options, callback) {
      /** the following code is for compatibility */
      let trigger
      let validateCallback
      let shouldRuleBeApplied
      let asyncValidatorOptions
      if (typeof options === 'string') {
        trigger = options
        validateCallback = callback
      } else if (options !== null && typeof options === 'object') {
        trigger = options.trigger
        validateCallback = options.callback
        shouldRuleBeApplied = options.shouldRuleBeApplied
        asyncValidatorOptions = options.options
      }
      return new Promise((resolve, reject) => {
        this._validate(trigger, shouldRuleBeApplied, asyncValidatorOptions).then(({ valid, errors }) => {
          if (valid) {
            if (validateCallback) {
              validateCallback()
            }
            resolve()
          } else {
            if (validateCallback) {
              validateCallback(errors)
            }
            // eslint-disable-next-line prefer-promise-reject-errors
            reject(errors)
          }
        })
      })
    },
    _validate (
      trigger = null,
      shouldRuleBeApplied = () => true,
      options = {
        suppressWarning: true
      }
    ) {
      const path = this.path
      /**
       * If not path is specified, not data will be validated, so any value will
       * be valid.
       */
      if (!path) {
        console.error(
          '[naive-ui/form-item]: `n-form-item` without `path` can\'t be validated.'
        )
        return Promise.resolve({
          valid: true
        })
      }
      if (!options) {
        options = {}
      } else {
        if (!options.first) options.first = this.first
      }
      const rules = this.syntheticRules
      const value = get(this.NForm.model, path, null)
      const activeRules = (!trigger
        ? rules
        : rules.filter(rule => {
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger)
          } else {
            return rule.trigger === trigger
          }
        })
      )
        .filter(shouldRuleBeApplied)
        .map(rule => {
          const shallowClonedRule = Object.assign({}, rule)
          if (shallowClonedRule.validator) {
            shallowClonedRule.validator = wrapValidator(shallowClonedRule.validator)
          }
          if (shallowClonedRule.asyncValidator) {
            shallowClonedRule.asyncValidator = wrapValidator(shallowClonedRule.asyncValidator)
          }
          return shallowClonedRule
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
            this.validationErrored = true
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
      this.validationErrored = false
    },
    addValidationEventListeners () {
      const rules = this.syntheticRules
      if (rules.length > 0) {
        this.$on('blur', this.handleContentBlur)
        this.$on('input', this.handleContentInput)
        this.$on('focus', this.handleContentFocus)
        this.$on('change', this.handleContentChange)
      }
    },
    handleBeforeEnter () {
      this.feedbackTransitionDisabled = false
      this.hasFeedback = true
    },
    handleAfterLeave () {
      this.hasFeedback = false
      this.feedbackTransitionDisabled = false
    }
  }
}
</script>
