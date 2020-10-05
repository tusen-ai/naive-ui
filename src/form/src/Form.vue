<template>
  <form
    class="n-form"
    :class="{
      'n-form--inline': inline
    }"
    @submit="onSubmit"
  >
    <slot />
  </form>
</template>

<script>
import { markRaw } from 'vue'

export default {
  name: 'Form',
  provide () {
    return {
      NForm: this
    }
  },
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: [Number, String],
      default: null
    },
    labelAlign: {
      type: String,
      default: 'left'
    },
    labelPlacement: {
      type: String,
      default: 'top'
    },
    model: {
      type: Object,
      default: () => {}
    },
    rules: {
      type: Object,
      default: undefined
    },
    showRequireMark: {
      type: Boolean,
      default: undefined
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: undefined
    },
    onSubmit: {
      type: Function,
      default: e => e.preventDefault()
    }
  },
  setup () {
    return {
      formItems: markRaw({})
    }
  },
  methods: {
    validate (callback, shouldRuleBeApplied = () => true) {
      return new Promise((resolve, reject) => {
        const formItemValidationPromises = []
        const formItems = this.formItems
        for (const key of Object.keys(formItems)) {
          const formItemInstances = formItems[key]
          for (const formItemInstance of formItemInstances) {
            if (formItemInstance.path) {
              formItemValidationPromises.push(
                formItemInstance._validate(null, shouldRuleBeApplied)
              )
            }
          }
        }
        Promise
          .all(formItemValidationPromises)
          .then(results => {
            if (results.some(result => !result.valid)) {
              const errors = results
                .filter(result => result.errors)
                .map(result => result.errors)
              if (callback) {
                callback(errors)
              } else {
                reject(errors)
              }
            } else {
              if (callback) callback()
              else {
                resolve()
              }
            }
          })
      })
    },
    clearValidationEffect () {
      const { formItems } = this
      for (const key of Object.keys(formItems)) {
        const formItemInstances = formItems[key]
        for (const formItemInstance of formItemInstances) {
          formItemInstance.clearValidationEffect()
        }
      }
    }
  }
}
</script>
