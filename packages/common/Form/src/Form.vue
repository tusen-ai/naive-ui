<template>
  <form
    class="n-form"
    :class="{
      'n-form--inline': inline
    }"
    @keydown.enter="handleKeyDownEnter"
  >
    <slot />
  </form>
</template>
<script>
import cloneDeep from 'lodash/cloneDeep'

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
      type: Number,
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
    validate (afterValidate, shouldFieldBeValidated = () => true) {
      return new Promise((resolve, reject) => {
        const formItemValidationPromises = []
        for (const key of Object.keys(this.items)) {
          const formItemInstances = this.items[key]
          for (const formItemInstance of formItemInstances) {
            if (formItemInstance.path) {
              formItemValidationPromises.push(formItemInstance._validate())
            }
          }
        }
        Promise
          .all(formItemValidationPromises)
          .then(results => {
            if (results.some(result => !result.valid)) {
              const errors = results.filter(result => result.errors).map(result => result.errors)
              if (afterValidate) {
                afterValidate(errors)
              } else {
                reject(errors)
              }
            } else {
              if (afterValidate) afterValidate()
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
    handleKeyDownEnter (e) {
      if (e.target.tagName === 'INPUT' && e.target.getAttribute('type')) {
        e.preventDefault()
      }
    }
  }
}
</script>
