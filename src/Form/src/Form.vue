<template>
  <form
    class="n-form"
    :class="{
      'n-form--inline': inline
    }"
    @submit="onSubmit"
    @keydown.enter.prevent="handleEnterKeyDown"
  >
    <slot />
  </form>
</template>
<script>
import cloneDeep from 'lodash-es/cloneDeep'

export default {
  name: 'NForm',
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
      default: function () {
        return {}
      }
    },
    showRequireMark: {
      type: Boolean,
      default: true
    },
    size: {
      validator (value) {
        return ['small', 'medium', 'large'].includes(value)
      },
      default: null
    },
    onSubmit: {
      type: Function,
      default: e => e.preventDefault()
    }
  },
  data () {
    return {
      items: {}
    }
  },
  created () {
    this.initialValue = cloneDeep(this.model)
  },
  methods: {
    validate (callback, shouldRuleBeApplied = () => true) {
      return new Promise((resolve, reject) => {
        const formItemValidationPromises = []
        const formItems = this.items
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
      const formItems = this.items
      for (const key of Object.keys(formItems)) {
        const formItemInstances = formItems[key]
        for (const formItemInstance of formItemInstances) {
          formItemInstance.clearValidationEffect()
        }
      }
    },
    handleEnterKeyDown (e) {
      if (e.target.tagName === 'INPUT') {
        this.onSubmit(e)
      }
    }
  }
}
</script>
