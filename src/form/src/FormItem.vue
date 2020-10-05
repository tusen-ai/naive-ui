<template>
  <div
    class="n-form-item"
    :class="{
      [`n-form-item--${mergedSize}-size`]: true,
      [`n-${syntheticTheme}-theme`]: syntheticTheme,
      [`n-form-item--${mergedLabelPlacement}-labelled`]: true,
      [`n-form-item--${mergedLabelAlign}-label-aligned`]: true,
      [`n-form-item--required`]: mergedShowRequireMark === undefined ? mergedShowRequireMark : mergedRequired,
      [`n-form-item--no-label`]: !(label || $slots.label)
    }"
  >
    <label
      v-if="label || $slots.label"
      :class="`n-form-item-label`"
      :style="mergedLabelStyle"
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
        :class="{
          [`n-form-item-blank--${mergedValidationStatus}`]: mergedValidationStatus
        }"
      >
        <slot />
      </div>
      <div
        v-if="mergedValidationStatus !== undefined || path"
        class="n-form-item-feedback-wrapper"
      >
        <transition
          name="n-form-item-feedback-transition"
          @before-enter="handleBeforeEnter"
          @before-leave="handleBeforeLeave"
          @after-leave="handleAfterLeave"
        >
          <div v-if="feedback !== undefined" class="n-form-item-feedback">
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
import {
  configurable,
  themeable,
  usecssr,
  registerable
} from '../../_mixins'
import styles from './styles'
import { warn } from '../../_utils/naive'
import {
  formItemMisc,
  formItemSize,
  formItemRule
} from './utils'

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
        } else if (validateResult === undefined) {
          return true
        } else {
          warn('form-item/validate', `You return a ${typeof validateResult} ` +
            'typed value in the validator method, which is not recommended. Please ' +
            'use `boolean`, `Error` or `Promise` typed value instead.'
          )
          return true
        }
      } catch (err) {
        warn(
          'form-item/validate', 'An error is catched in the validation, ' +
          'so the validation won\'t be done. Your callback in `validate` method of ' +
          '`n-form` or `n-form-item` won\'t be called in this validation.'
        )
        console.error(err)
        return undefined
      }
    }
  }
  return validator
}

export default {
  name: 'FormItem',
  cssrName: 'Form',
  mixins: [
    registerable('NForm', 'formItems', 'path'),
    configurable,
    themeable,
    usecssr(styles)
  ],
  props: {
    label: {
      type: [Number, String],
      default: undefined
    },
    labelWidth: {
      type: [Number, String],
      default: undefined
    },
    labelStyle: {
      type: Object,
      default: () => {}
    },
    labelAlign: {
      type: String,
      default: undefined
    },
    labelPlacement: {
      type: String,
      default: undefined
    },
    path: {
      type: String,
      default: undefined
    },
    first: {
      type: Boolean,
      default: false
    },
    rulePath: {
      type: String,
      default: undefined
    },
    required: {
      type: Boolean,
      default: false
    },
    showRequireMark: {
      type: Boolean,
      default: undefined
    },
    rule: {
      type: [Object, Array],
      default: undefined
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    ignorePathChange: {
      type: Boolean,
      default: false
    },
    validationStatus: {
      validator (value) {
        return ['error', 'warning', 'success'].includes(value)
      },
      default: undefined
    },
    feedback: {
      type: String,
      default: undefined
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
  setup (props) {
    return {
      ...formItemSize(props),
      ...formItemMisc(props),
      ...formItemRule(props)
    }
  },
  data () {
    return {
      explains: [],
      feedbackTransitionDisabled: true
    }
  },
  watch: {
    path () {
      if (this.ignorePathChange) return
      this.restoreValidation()
    }
  },
  mounted () {
    this.feedbackTransitionDisabled = false
  },
  methods: {
    restoreValidation () {
      this.explains = []
      this.validationErrored = false
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
        if (__DEV__) {
          warn('form-item', '`n-form-item` without `path` can\'t be validated.')
        }
        return Promise.resolve({
          valid: true
        })
      }
      if (!options) {
        options = {}
      } else {
        if (!options.first) options.first = this.first
      }
      const rules = this.mergedRules
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
    handleBeforeEnter () {
      this.feedbackTransitionDisabled = false
    },
    handleAfterLeave () {
      this.feedbackTransitionDisabled = false
    }
  }
}
</script>
