<template>
  <div
    class="n-form-item"
    :class="[
      `n-form-item--${mergedSize}-size`,
      `n-form-item--${mergedLabelPlacement}-labelled`
    ]"
    :style="cssVars"
  >
    <label
      v-if="label || $slots.label"
      class="n-form-item-label"
      :style="mergedLabelStyle"
    >
      <slot name="label">{{ label }}</slot>
      <span
        v-if="
          mergedShowRequireMark !== undefined
            ? mergedShowRequireMark
            : mergedRequired
        "
        class="n-form-item-label__asterisk"
      >&nbsp;*</span>
    </label>
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
</template>

<script>
import { defineComponent, computed } from 'vue'
import Schema from 'async-validator'
import { get } from 'lodash-es'
import { createId } from 'seemly'
import { registerable, useTheme } from '../../_mixins'
import { warn, createKey } from '../../_utils'
import { formLight } from '../styles'
import { formItemMisc, formItemSize, formItemRule } from './utils'
import Feedbacks from './Feedbacks.vue'
import style from './styles/form-item.cssr.js'

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

export default defineComponent({
  name: 'FormItem',
  components: {
    Feedbacks
  },
  mixins: [registerable('NForm', 'formItems', 'path')],
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
    ...useTheme.props,
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
    const formItemSizeReactive = formItemSize(props)
    const formItemMiscReactive = formItemMisc(props)
    const { mergedSize: mergedSizeRef } = formItemSizeReactive
    const { mergedLabelPlacement: labelPlacementRef } = formItemMiscReactive
    const themeRef = useTheme('Form', 'FormItem', style, formLight, props)
    return {
      ...formItemSizeReactive,
      ...formItemMiscReactive,
      ...formItemRule(props),
      cssVars: computed(() => {
        const { value: size } = mergedSizeRef
        const { value: labelPlacement } = labelPlacementRef
        const direction = labelPlacement === 'top' ? 'vertical' : 'horizontal'
        const {
          common: { cubicBezierEaseInOut },
          self: {
            labelTextColor,
            asteriskColor,
            lineHeight,
            feedbackTextColorWarning,
            feedbackTextColorError,
            feedbackPadding,
            [createKey('labelHeight', size)]: labelHeight,
            [createKey('blankHeight', size)]: blankHeight,
            [createKey('feedbackFontSize', size)]: feedbackFontSize,
            [createKey('feedbackHeight', size)]: feedbackHeight,
            [createKey('labelPadding', direction)]: labelPadding,
            [createKey('labelTextAlign', direction)]: labelTextAlign,
            [createKey('labelFontSize', labelPlacement, size)]: labelFontSize
          }
        } = themeRef.value
        return {
          '--bezier': cubicBezierEaseInOut,
          '--line-height': lineHeight,
          '--blank-height': blankHeight,
          '--label-font-size': labelFontSize,
          '--label-height': labelHeight,
          '--label-padding': labelPadding,
          '--asterisk-color': asteriskColor,
          '--label-text-color': labelTextColor,
          '--feedback-padding': feedbackPadding,
          '--feedback-font-size': feedbackFontSize,
          '--feedback-height': feedbackHeight,
          '--feedback-text-color-warning': feedbackTextColorWarning,
          '--feedback-text-color-error': feedbackTextColorError,
          '--label-text-align': labelTextAlign
        }
      })
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
})
</script>
