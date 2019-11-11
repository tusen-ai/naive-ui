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
      default: function () {
        return {}
      }
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
      initialValue: null,
      items: {}
    }
  },
  created () {
    this.initialValue = cloneDeep(this.model)
  },
  methods: {
    /**
     * form validation, validate all prop-elements by default,
     * can use specify the scope of validation by param part.
     *
     * @param {Funtion} callback callback
     * @param {Array} scope  to specify the scope of validation
     * @return {Boolean} validation passed or not
     */
    validate (callback, shouldFieldBeValidated = () => true) {
      console.log(this.items)
      let valid = true
      let fields = {}
      for (const key of Object.keys(this.items)) {
        const formItemInstances = this.items[key]
        for (const formItemInstance of formItemInstances) {
          if (shouldFieldBeValidated(formItemInstance.path)) {
            formItemInstance.validate()
          }
        }
      }
      if (callback) {
        callback(valid, fields)
      }
      return Promise.resolve(valid)
    },
    resetForm (target = this) {
      for (const key of Object.keys(this.items)) {
        const formItemInstances = this.items[key]
        for (const formItemInstance of formItemInstances) {
          formItemInstance.cleanValidationEffect()
        }
      }
      this.value = this.initialValue
    },
    handleKeyDownEnter (e) {
      if (e.target.tagName === 'INPUT' && e.target.getAttribute('type')) {
        e.preventDefault()
      }
    }
  }
}
</script>
