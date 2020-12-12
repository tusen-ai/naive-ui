<template>
  <div
    class="n-form-item"
    :class="{
      [`n-form-item--${mergedSize}-size`]: true,
      [`n-${mergedTheme}-theme`]: mergedTheme,
      [`n-form-item--${mergedLabelPlacement}-labelled`]: true,
      [`n-form-item--${mergedLabelAlign}-label-aligned`]: true,
      [`n-form-item--required`]:
        mergedShowRequireMark === undefined
          ? mergedShowRequireMark
          : mergedRequired,
      [`n-form-item--no-label`]: !(label || $slots.label)
    }"
  >
    <label
      v-if="label || $slots.label"
      :class="`n-form-item-label`"
      :style="mergedLabelStyle"
    >
      <template v-if="$slots.label"><slot name="label" /></template>
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
        v-if="mergedShowFeedback"
        :key="feedbackId"
        class="n-form-item-feedback-wrapper"
      >
        <transition
          name="n-fade-down-transition"
          :mode="mergedValidationStatus ? 'out-in' : undefined"
        >
          <template v-if="hasFeedback">
            <div
              v-if="mergedValidationStatus === 'warning'"
              key="controlled-warning"
              class="n-form-item-feedback n-form-item-feedback--warning"
            >
              <feedbacks :explains="explains" :feedback="feedback" />
            </div>
            <div
              v-else-if="mergedValidationStatus === 'error'"
              key="controlled-error"
              class="n-form-item-feedback n-form-item-feedback--error"
            >
              <feedbacks :explains="explains" :feedback="feedback" />
            </div>
            <div
              v-else-if="mergedValidationStatus === 'success'"
              key="controlled-success"
              class="n-form-item-feedback n-form-item-feedback--success"
            >
              <feedbacks :explains="explains" :feedback="feedback" />
            </div>
            <div v-else key="controlled-default" class="n-form-item-feedback">
              <feedbacks :explains="explains" :feedback="feedback" />
            </div>
          </template>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator'
import { get } from 'lodash-es'
import { createId } from 'seemly'
import { configurable, themeable, withCssr, registerable } from '../../_mixins'
import styles from './styles'
import { warn } from '../../_utils'
import { formItemMisc, formItemSize, formItemRule } from './utils'
import Feedbacks from './Feedbacks.vue'

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
          warn(
            'form-item/validate',
            `You return a ${typeof validateResult} ` +
              'typed value in the validator method, which is not recommended. Please ' +
              'use `boolean`, `Error` or `Promise` typed value instead.'
          )
          return true
        }
      } catch (err) {
        warn(
          'form-item/validate',
          'An error is catched in the validation, ' +
            "so the validation won't be done. Your callback in `validate` method of " +
            "`n-form` or `n-form-item` won't be called in this validation."
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
  components: {
    Feedbacks
  },
  mixins: [
    registerable('NForm', 'formItems', 'path'),
    configurable,
    themeable,
    withCssr(styles)
  ],
  inject: {
    NForm: {
      default: null
    }
  },
  provide () {
    return {
      NFormItem: this
    }
  },
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
    showFeedback: {
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
      feedbackId: createId()
    }
  },
  computed: {
    hasFeedback () {
      const { feedback } = this
      if (feedback !== undefined && feedback !== null) return true
      return this.explains.length
    }
  },
  watch: {
    path () {
      if (this.ignorePathChange) return
      this.restoreValidation()
    }
  },
  methods: {
    restoreValidation () {
      this.explains = []
      this.validationErrored = false
      this.feedbackId = createId()
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
        this._validate(
          trigger,
          shouldRuleBeApplied,
          asyncValidatorOptions
        ).then(({ valid, errors }) => {
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
        : rules.filter((rule) => {
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger)
          } else {
            return rule.trigger === trigger
          }
        })
      )
        .filter(shouldRuleBeApplied)
        .map((rule) => {
          const shallowClonedRule = Object.assign({}, rule)
          if (shallowClonedRule.validator) {
            shallowClonedRule.validator = wrapValidator(
              shallowClonedRule.validator
            )
          }
          if (shallowClonedRule.asyncValidator) {
            shallowClonedRule.asyncValidator = wrapValidator(
              shallowClonedRule.asyncValidator
            )
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
            this.explains = errors.map((error) => error.message)
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
    }
  }
}
</script>
